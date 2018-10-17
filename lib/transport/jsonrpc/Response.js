import RpcError from '../../Error';

export default function Response(response, converter) {
	const { result } = response;

	if (result) {
		return typeof converter === 'function' ? converter(result) : result;
	}

	const { error } = response;
	return new RpcError(error);
}
