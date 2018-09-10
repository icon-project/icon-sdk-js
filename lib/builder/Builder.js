import { CallBuilder } from './call/Call';
import { IcxTransactionBuilder } from './transaction/IcxTransaction';
import { CallTransactionBuilder } from './transaction/CallTransaction';
import { DeployTransactionBuilder } from './transaction/DeployTransaction';
import { MessageTransactionBuilder } from './transaction/MessageTransaction';

const Builder = {
    CallBuilder,
    IcxTransactionBuilder,
    CallTransactionBuilder,
    DeployTransactionBuilder,
    MessageTransactionBuilder,
}

export default Builder