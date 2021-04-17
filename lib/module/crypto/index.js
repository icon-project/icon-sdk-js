const crypto = require("crypto-browserify");

if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
  // react-native
  crypto.getRandomValues = (buffer) => {
    for (let round = 0; round < 20; round++) {
      for (let i = 0; i < buffer.length; i++) {
        if (round) {
          buffer[i] ^= Math.trunc(256 * Math.random());
        } else {
          buffer[i] = Math.trunc(256 * Math.random());
        }
      }
    }

    return buffer;
  };

  crypto.randomBytes = (length) => {
    if (
      length <= 0 ||
      length > 1024 ||
      parseInt(String(length), 10) !== length
    ) {
      throw new Error("invalid length");
    }
    const result = Buffer.from(new Uint8Array(length));

    return crypto.getRandomValues(result);
  };
}

export default crypto;
