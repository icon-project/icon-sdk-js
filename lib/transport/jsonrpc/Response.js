import { RpcError } from "../../Error";

export default function Response(response, converter) {
    const result = response["result"];
    if (result) {
        return typeof converter === 'function' ? converter(result) : result;
    }
    else {
        const error = response["error"];
        return new RpcError(error);
    }
}