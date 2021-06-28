/*
 * Copyright 2021 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ExceptionCode = {
  0: "DATA ERROR",
  1: "FORMAT ERROR",
  2: "WALLET ERROR",
  3: "RPC ERROR",
  4: "SCORE ERROR",
  5: "NETWORK ERROR",
} as const;

/**
 * Class representing the Exception
 */
export class Exception {
  code: string;
  message: string;

  /**
   * Creates an instance of Exception.
   * @param {string} code The exception code.
   * @param {string} message The exception message.
   */
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  /**
   * Converts Exception instance to string.
   * @return The exception string.
   */
  toString(): string {
    return `[${this.code}] ${this.message}`;
  }
}

/**
 * The exception class relate to data type.
 * @extends {Exception}
 */
export class DataError extends Exception {
  /**
   * Creates an instance of DataError.
   * @param {string} message The exception message.
   */
  constructor(message: string) {
    super(ExceptionCode[0], message);
  }
}

/**
 * The exception class relate to format.
 * @extends {Exception}
 */
export class FormatError extends Exception {
  /**
   * Creates an instance of FormatError.
   * @param {string} message The exception message.
   */
  constructor(message: string) {
    super(ExceptionCode[1], message);
  }
}

/**
 * The exception class relate to wallet issue.
 * @extends {Exception}
 */
export class WalletError extends Exception {
  /**
   * Creates an instance of WalletError.
   * @param {string} message The exception message.
   */
  constructor(message: string) {
    super(ExceptionCode[2], message);
  }
}

/**
 * The exception class relate to network issue.
 * @extends {Exception}
 */
export class RpcError extends Exception {
  /**
   * Creates an instance of RpcError.
   * @param {string} message The exception message.
   */
  constructor(message: string) {
    super(ExceptionCode[3], message);
  }
}

/**
 * The exception class relate to SCORE issue.
 * @extends {Exception}
 */
export class ScoreError extends Exception {
  /**
   * Creates an instance of ScoreError.
   * @param {string} message The exception message.
   */
  constructor(message: string) {
    super(ExceptionCode[4], message);
  }
}

export class NetworkError extends Exception {
  constructor(message: string) {
    super(ExceptionCode[5], message);
  }
}
