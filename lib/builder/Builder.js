import { CallBuilder } from './call/Call';
import { TransactionBuilder } from './transaction/Transaction';
import { CallTransactionBuilder } from './transaction/CallTransaction';
import { DeployTransactionBuilder } from './transaction/DeployTransaction';
import { MessageTransactionBuilder } from './transaction/MessageTransaction';

const Builder = {
    CallBuilder,
    TransactionBuilder,
    CallTransactionBuilder,
    DeployTransactionBuilder,
    MessageTransactionBuilder,
}

export default Builder