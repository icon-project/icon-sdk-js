const WALLET_ADDRESS_1 = 'hx56614cd4a1a7fcfd92e9a723b75f6cef04695226';
const PRIVATE_KEY_1 = '86414d34ff8cdaa2bc335ac8f6bd56a16e15921a6b70ffad24ce47d47435275d';
const WALLET_ADDRESS_2 = 'hx5d61858c20ca7c1676740926faef0bc60ff7dc21';
const PRIVATE_KEY_2 = '0ab893cb585df8e6607bf90f68940b104c1b02bd78f4ff03c81fc49bb8462ee1';
const TOKEN_ADDRESS = 'cx4ae65c058d35b5bb8cef668be5113354448c0264';
const GOVERNANCE_ADDRESS = 'cx0000000000000000000000000000000000000001';
const SCORE_INSTALL_ADDRESS = 'cx0000000000000000000000000000000000000000';
const NODE_URL = 'https://testwallet.icon.foundation/api/v3';
const KEYSTORE_FILE = {
	version: 3,
	id: '5cadce02-7925-4dab-838c-efe58e181d5e',
	address: 'hx56614cd4a1a7fcfd92e9a723b75f6cef04695226',
	crypto: {
		ciphertext: '5b79944249eda02e524334d5fbd3032cf63ea0b7d52fa19fb2652dc2d0a02ec2',
		cipherparams: {
			iv: 'af911ac71940b33abd42bb96c7a31bf1',
		},
		cipher: 'aes-128-ctr',
		kdf: 'scrypt',
		kdfparams: {
			dklen: 32,
			salt: 'adc48f5f5719ca1e7709e784e88583ecf633332f0a36f0805837df80703b3cf8',
			n: 16384,
			r: 8,
			p: 1,
		},
		mac: '35c26237547c0a21f142cf1ae8d9d651d5eebe50f1c16d8608548f9f7ae12531',
	},
};
const PASSWORD = 'qwer1234!';

export default {
	WALLET_ADDRESS_1,
	PRIVATE_KEY_1,
	WALLET_ADDRESS_2,
	PRIVATE_KEY_2,
	TOKEN_ADDRESS,
	GOVERNANCE_ADDRESS,
	SCORE_INSTALL_ADDRESS,
	NODE_URL,
	KEYSTORE_FILE,
	PASSWORD,
};
