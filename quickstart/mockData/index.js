const WALLET_ADDRESS_1 = "hx902ecb51c109183ace539f247b4ea1347fbf23b5";
const PRIVATE_KEY_1 =
  "38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6";
const WALLET_ADDRESS_2 = "hxd008c05cbc0e689f04a5bb729a66b42377a9a497";
const PRIVATE_KEY_2 =
  "7c739961afd3df0c36d4560037540d8e4ebb4e4584f9e5284789ade976897a4c";
const TOKEN_ADDRESS = "cx4ae65c058d35b5bb8cef668be5113354448c0264";
const GOVERNANCE_ADDRESS = "cx0000000000000000000000000000000000000001";
const SCORE_INSTALL_ADDRESS = "cx0000000000000000000000000000000000000000";
const NODE_URL = "https://test-ctz.solidwallet.io/api/v3";
const DEBUG_URL = "https://test-ctz.solidwallet.io/api/debug/v3";
const KEYSTORE_FILE = {
  version: 3,
  id: "e00e113c-1e45-47e4-b732-10f3d1903d75",
  address: "hx7d3d4c743bb82b927ea8a0551a3b9288e722ac84",
  crypto: {
    ciphertext:
      "d5df37230528bbfc0015e93c61e60041a31fb63266f61ffec60a31f474d4d7d0",
    cipherparams: {
      iv: "feaf0cc19678e4b78369904a99ba411e",
    },
    cipher: "aes-128-ctr",
    kdf: "scrypt",
    kdfparams: {
      dklen: 32,
      salt: "e2e3666919161044f7b369d6ad4296380d4a13b9b5e844301c64a502ea3da240",
      n: 16384,
      r: 8,
      p: 1,
    },
    mac: "43789e78de4744d06c14cf966b9609fadbcd815b5380caf3f778797f9824d9d7",
  },
};
const PASSWORD = "qwer1234!";

export default {
  WALLET_ADDRESS_1,
  PRIVATE_KEY_1,
  WALLET_ADDRESS_2,
  PRIVATE_KEY_2,
  TOKEN_ADDRESS,
  GOVERNANCE_ADDRESS,
  SCORE_INSTALL_ADDRESS,
  NODE_URL,
  DEBUG_URL,
  KEYSTORE_FILE,
  PASSWORD,
};
