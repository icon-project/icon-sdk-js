/*
 * Original Code
 * https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js
 */
import { sha3_256 as sha3256, keccak256 } from "js-sha3";
import { v4 as uuidv4 } from "uuid";
import { crypto } from "./module/node";
import scryptsy from "./module/scryptsy";
import { addHxPrefix } from "./data/Hexadecimal";
import { sign } from "./data/Util";
import { isPrivateKey } from "./data/Validator";
import { WalletError } from "./Exception";
import { isString } from "./data/Type";

const secp256k1 = require("secp256k1");

// eslint-disable-next-line no-unused-vars
type Keccak256 = { toString(str: string): string };

export interface KeyStore {
  version: 3;
  id: string;
  address: string;
  crypto: {
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    cipher: string;
    kdf: any;
    kdfparams: {
      dklen: number;
      salt: string;
      prf?: string;
      n?: number;
      r?: number;
      p?: number;
      c?: number;
    };
    mac: string;
  };
  coinType: "icx";
}

/**
 * Class which provides EOA functions.
 */
export default class Wallet {
  private _privKey: any;

  private privKey: any;

  private pubKey: any;

  private address: string;

  /**
   * Creates an instance of Wallet.
   * @param {string} privKey - The private key.
   */
  constructor(privKey: typeof Buffer) {
    if (!privKey) {
      const error = new WalletError(
        "A private key must be supplied to the constructor."
      );
      throw error.toString();
    }

    if (privKey && !isPrivateKey(privKey)) {
      const error = new WalletError(`[${privKey}] is not a valid private key.`);
      throw error.toString();
    }

    this._privKey = privKey;
  }

  /**
   * Creates an instance of Wallet.
   * @static
   * @return {Wallet} The wallet instance.
   */
  static create(): Wallet {
    let privKey: string;

    do {
      privKey = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey as any));

    return new Wallet(privKey as any);
  }

  /**
   * Import existing wallet instance using private key.
   * @static
   * @param {string} privKey - The private key.
   * @return {Wallet} The wallet instance.
   */
  static loadPrivateKey(privKey: string): Wallet {
    if (!isPrivateKey(privKey)) {
      const error = new WalletError(`[${privKey}] is not a valid private key.`);
      throw error.toString();
    }

    const pkBuffer = Buffer.from(privKey, "hex");

    return new Wallet(pkBuffer as any);
  }

  /**
   * Import existing wallet instance using keystore object.
   * @static
   * @param {object|string} keystore - The keystore object or stringified object.
   * @param {string} password - The password of keystore object.
   * @param {boolean=} nonStrict - Set whether checking keystore file case-insensitive or not. (affects when 'keystore' param is string.)
   * @return {Wallet} The wallet instance.
   */
  static loadKeystore(
    keystore: KeyStore | string,
    password: string,
    nonStrict: boolean
  ): Wallet {
    if (!isString(password)) {
      const error = new WalletError("Password is invalid.");
      throw error.toString();
    }

    const json: KeyStore =
      typeof keystore === "object"
        ? keystore
        : JSON.parse(
            nonStrict
              ? (keystore as unknown as string).toLowerCase()
              : (keystore as string)
          );

    if (json.version !== 3) {
      const error = new WalletError("This is not a V3 wallet.");
      throw error.toString();
    }

    let derivedKey: any;
    let kdfparams: KeyStore["crypto"]["kdfparams"];

    if (json.crypto.kdf === "scrypt") {
      kdfparams = json.crypto.kdfparams;
      derivedKey = (scryptsy as any)(
        Buffer.from(password) as any,
        Buffer.from(kdfparams.salt, "hex") as any,
        kdfparams.n,
        kdfparams.r,
        kdfparams.p,
        kdfparams.dklen
      );
    } else if (json.crypto.kdf === "pbkdf2") {
      kdfparams = json.crypto.kdfparams;

      if (kdfparams.prf !== "hmac-sha256") {
        const error = new WalletError(
          "It's an unsupported parameters to PBKDF2."
        );
        throw error.toString();
      }

      derivedKey = crypto.pbkdf2Sync(
        Buffer.from(password),
        Buffer.from(kdfparams.salt, "hex"),
        kdfparams.c,
        kdfparams.dklen,
        "sha256"
      );
    } else {
      const error = new WalletError(
        "It's an unsupported key derivation scheme."
      );
      throw error.toString();
    }

    const ciphertext = Buffer.from(json.crypto.ciphertext, "hex");

    const mac = keccak256(
      Buffer.concat([derivedKey.slice(16, 32), ciphertext])
    ) as Keccak256;

    if (mac.toString("hex") !== json.crypto.mac) {
      const error = new WalletError(
        "Key derivation is failed (possibly wrong passphrase)."
      );
      throw error.toString();
    }

    const decipher = crypto.createDecipheriv(
      json.crypto.cipher,
      derivedKey.slice(0, 16),
      Buffer.from(json.crypto.cipherparams.iv, "hex")
    );
    const seed = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return new Wallet(seed as any);
  }

  /**
   * Get keystore object of an instance of a `Wallet` class.
   * @param {string} password - The new password for encryption.
   * @param {object=} opts - The custom options for encryption.
   * @return {object} A keystore object.
   */
  store(password: string, opts: any = {}): KeyStore {
    const salt = opts.salt || crypto.randomBytes(32);
    const iv = opts.iv || crypto.randomBytes(16);

    let derivedKey: typeof Buffer;
    const kdf = opts.kdf || "scrypt";
    const kdfparams: KeyStore["crypto"]["kdfparams"] = {
      dklen: opts.dklen || 32,
      salt: salt.toString("hex"),
    };

    if (kdf === "scrypt") {
      kdfparams.n = opts.n || 16384;
      kdfparams.r = opts.r || 8;
      kdfparams.p = opts.p || 1;
      derivedKey = (scryptsy as any)(
        Buffer.from(password) as any,
        salt,
        kdfparams.n,
        kdfparams.r,
        kdfparams.p,
        kdfparams.dklen
      );
    } else if (kdf === "pbkdf2") {
      kdfparams.c = opts.c || 16384;
      kdfparams.prf = "hmac-sha256";
      derivedKey = crypto.pbkdf2Sync(
        Buffer.from(password),
        salt,
        kdfparams.c,
        kdfparams.dklen,
        "sha256"
      );
    } else {
      const error = new WalletError("It's an unsupported kdf.");
      throw error.toString();
    }

    const cipher = crypto.createCipheriv(
      opts.cipher || "aes-128-ctr",
      (derivedKey as any).slice(0, 16),
      iv
    );

    if (!cipher) {
      const error = new WalletError("It's an unsupported cipher.");
      throw error.toString();
    }

    const ciphertext = Buffer.concat([
      cipher.update(this.privKey),
      cipher.final(),
    ]);
    const mac = keccak256(
      Buffer.concat([
        (derivedKey as any).slice(16, 32),
        Buffer.from(ciphertext as any, "hex"),
      ])
    ) as Keccak256;

    return {
      version: 3,
      id: uuidv4({ random: opts.uuid || crypto.randomBytes(16) }),
      address: this.getAddress(),
      crypto: {
        ciphertext: ciphertext.toString("hex"),
        cipherparams: {
          iv: iv.toString("hex"),
        },
        cipher: opts.cipher || "aes-128-ctr",
        kdf,
        kdfparams,
        mac: mac.toString("hex"),
      },
      coinType: "icx",
    } as const;
  }

  /**
   * Generate signature string by signing transaction object.
   * @param {string} data - The serialized transaction object.
   * @return {string} The signature string.
   */
  sign(data: string): string {
    const signature = sign(data, this.privKey);
    return Buffer.from(signature).toString("base64");
  }

  /**
   * Get private key of wallet instance.
   * @return {string} The private key.
   */
  getPrivateKey(): string {
    return this.privKey.toString("hex");
  }

  /**
   * Get public key of wallet instance.
   * @return {string} The public key.
   */
  getPublicKey(): string {
    return Buffer.from(this.pubKey).toString("hex");
  }

  /**
   * Get EOA address of wallet instance.
   * @return {string} The EOA address.
   */
  getAddress(): string {
    return this.address;
  }
}

Object.defineProperty(Wallet.prototype, "privKey", {
  get: function get() {
    if (!this._privKey) {
      const error = new WalletError("This is a public key only wallet.");
      throw error.toString();
    }

    return this._privKey;
  },
});

Object.defineProperty(Wallet.prototype, "pubKey", {
  get: function get() {
    return secp256k1.publicKeyCreate(this.privKey, false).slice(1);
  },
});

Object.defineProperty(Wallet.prototype, "address", {
  get: function get() {
    return addHxPrefix(sha3256(this.pubKey).slice(-40));
  },
});
