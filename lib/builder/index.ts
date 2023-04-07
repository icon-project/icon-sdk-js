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

import { CallBuilder } from "./call/Call";
import { IcxTransactionBuilder } from "./transaction/IcxTransaction";
import { CallTransactionBuilder } from "./transaction/CallTransaction";
import DeployTransactionBuilder from "./transaction/DeployTransaction";
import DepositTransactionBuilder from "./transaction/DepositTransaction";
import MessageTransactionBuilder from "./transaction/MessageTransaction";
import { CallTransaction } from "./transaction/CallTransaction";
import { DepositTransaction } from "./transaction/DepositTransaction";
import { DeployTransaction } from "./transaction/DeployTransaction";
import { IcxTransaction } from "./transaction/IcxTransaction";
import { MessageTransaction } from "./transaction/MessageTransaction";
import { Call } from "./call/Call";

const Builder = {
  CallBuilder,
  IcxTransactionBuilder,
  CallTransactionBuilder,
  DeployTransactionBuilder,
  MessageTransactionBuilder,
  DepositTransactionBuilder,
};

export default Builder;
export {
  CallTransaction,
  DeployTransaction,
  DepositTransaction,
  IcxTransaction,
  MessageTransaction,
  Call,
  CallBuilder,
  IcxTransactionBuilder,
  CallTransactionBuilder,
  DeployTransactionBuilder,
  DepositTransactionBuilder,
  MessageTransactionBuilder,
}
