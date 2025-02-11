/**
 * Set of constants values as defined in each LUKSO Standards Proposals (LSPs).
 * @see https://github.com/lukso-network/LIPs/tree/main/LSPs
 */

// ERC165
// ---------

const INTERFACE_IDS = {
	ERC165: '0x01ffc9a7',
	ERC1271: '0x1626ba7e',
	ERC20: '0x36372b07',
	ERC223: '0x87d43052',
	ERC721: '0x80ac58cd',
	ERC721Metadata: '0x5b5e139f',
	ERC777: '0xe58e113c',
	ERC1155: '0xd9b67a26',
	ERC725X: '0x570ef073',
	ERC725Y: '0x714df77c',
	LSP0ERC725Account: '0x66767497',
	LSP1UniversalReceiver: '0x6bb56a14',
	LSP6KeyManager: '0xfb437414',
	LSP7DigitalAsset: '0xda1f85e4',
	LSP8IdentifiableDigitalAsset: '0x622e7a01',
	LSP9Vault: '0x7050cee9',
	LSP11BasicSocialRecovery: '0x049a28f1',
	LSP14Ownable2Step: '0x94be5999',
	LSP17Extendable: '0xa918fa6b',
	LSP17Extension: '0xcee78b40',
};

// ERC1271
// ----------

const ERC1271_VALUES = {
	MAGIC_VALUE: '0x1626ba7e',
	FAIL_VALUE: '0xffffffff',
};

// ERC725X
// ----------

const OPERATION_TYPES = {
	CALL: 0,
	CREATE: 1,
	CREATE2: 2,
	STATICCALL: 3,
	DELEGATECALL: 4,
};

// ERC725Y
// ----------

const SupportedStandards = {
	LSP3UniversalProfile: {
		key: '0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38',
		value: '0xabe425d6',
	},
	LSP4DigitalAsset: {
		key: '0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c',
		value: '0xa4d96624',
	},
	LSP9Vault: {
		key: '0xeafec4d89fa9619884b600007c0334a14085fefa8b51ae5a40895018882bdb90',
		value: '0x7c0334a1',
	},
};

/**
 * For more infos on the type of each keys
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 */
const ERC725YDataKeys = {
	LSP1: {
		// bytes10(keccak256('LSP1UniversalReceiverDelegate')) + bytes2(0)
		LSP1UniversalReceiverDelegatePrefix: '0x0cfc51aec37c55a4d0b10000',

		// keccak256('LSP1UniversalReceiverDelegate')
		LSP1UniversalReceiverDelegate:
			'0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
	},
	LSP3: {
		SupportedStandards_LSP3: SupportedStandards.LSP3UniversalProfile.key,

		// keccak256('LSP3Profile')
		LSP3Profile: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
	},
	LSP4: {
		SupportedStandards_LSP4: SupportedStandards.LSP4DigitalAsset.key,

		// keccak256('LSP4TokenName')
		LSP4TokenName: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',

		// keccak256('LSP4TokenSymbol')
		LSP4TokenSymbol: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',

		// keccak256('LSP4Metadata')
		LSP4Metadata: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',

		// LSP4CreatorsMap:<address>  + bytes2(0)
		LSP4CreatorsMap: '0x6de85eaf5d982b4e5da00000',

		// keccak256('"LSP4Creators[]')
		'LSP4Creators[]': {
			length: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
			index: '0x114bd03b3a46d48759680d81ebb2b414',
		},
	},
	LSP5: {
		// LSP5ReceivedAssetsMap:<address>  + bytes2(0)
		LSP5ReceivedAssetsMap: '0x812c4334633eb816c80d0000',

		// keccak256('LSP5ReceivedAssets[]')
		'LSP5ReceivedAssets[]': {
			length: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
			index: '0x6460ee3c0aac563ccbf76d6e1d07bada',
		},
	},
	LSP6: {
		// keccak256('AddressPermissions[]')
		'AddressPermissions[]': {
			length: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
			index: '0xdf30dba06db6a30e65354d9a64c60986',
		},

		AddressPermissionsPrefix: '0x4b80742de2bf',

		// AddressPermissions:Permissions:<address>  + bytes2(0)
		'AddressPermissions:Permissions': '0x4b80742de2bf82acb3630000',

		// AddressPermissions:AllowedERC725YDataKeys:<address>  + bytes2(0)
		'AddressPermissions:AllowedERC725YDataKeys': '0x4b80742de2bf866c29110000',

		// AddressPermissions:AllowedCalls:<address>  + bytes2(0)
		'AddressPermissions:AllowedCalls': '0x4b80742de2bf393a64c70000',
	},
	LSP9: {
		SupportedStandards_LSP9: SupportedStandards.LSP9Vault.key,
	},
	LSP10: {
		// keccak256('LSP10VaultsMap') + bytes2(0)
		LSP10VaultsMap: '0x192448c3c0f88c7f238c0000',

		// keccak256('LSP10Vaults[]')
		'LSP10Vaults[]': {
			length: '0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06',
			index: '0x55482936e01da86729a45d2b87a6b1d3',
		},
	},
	LSP12: {
		// LSP12IssuedAssetsMap:<address>  + bytes2(0)
		LSP12IssuedAssetsMap: '0x74ac2555c10b9349e78f0000',

		// keccak256('LSP12IssuedAssets[]')
		'LSP12IssuedAssets[]': {
			length: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
			index: '0x7c8c3416d6cda87cd42c71ea1843df28',
		},
	},
	LSP17: {
		// bytes10(keccak256('LSP17Extension')) + bytes2(0)
		LSP17ExtensionPrefix: '0xcee78b4094da860110960000',
	},
};

const BasicUPSetup_Schema = [
	{
		name: 'LSP3Profile',
		key: ERC725YDataKeys.LSP3['LSP3Profile'],
		keyType: 'Singleton',
		valueContent: 'JSONURL',
		valueType: 'bytes',
	},
	{
		name: 'LSP1UniversalReceiverDelegate',
		key: ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate,
		keyType: 'Singleton',
		valueContent: 'Address',
		valueType: 'address',
	},
	{
		name: 'LSP12IssuedAssets[]',
		key: ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
		keyType: 'Array',
		valueContent: 'Number',
		valueType: 'uint256',
	},
];

// LSP6
// ----------

const LSP6_VERSION = 6;

// All Permissions currently exclude REENTRANCY, DELEGATECALL and SUPER_DELEGATECALL for security
const ALL_PERMISSIONS = '0x00000000000000000000000000000000000000000000000000000000003f3f7f';

// prettier-ignore
const PERMISSIONS = {
	CHANGEOWNER                      :"0x0000000000000000000000000000000000000000000000000000000000000001",
	ADDCONTROLLER                   :"0x0000000000000000000000000000000000000000000000000000000000000002",
	CHANGEPERMISSIONS                :"0x0000000000000000000000000000000000000000000000000000000000000004",
	ADDEXTENSIONS                    :"0x0000000000000000000000000000000000000000000000000000000000000008",
	CHANGEEXTENSIONS                 :"0x0000000000000000000000000000000000000000000000000000000000000010",
	ADDUNIVERSALRECEIVERDELEGATE     :"0x0000000000000000000000000000000000000000000000000000000000000020",
	CHANGEUNIVERSALRECEIVERDELEGATE  :"0x0000000000000000000000000000000000000000000000000000000000000040",
	REENTRANCY                       :"0x0000000000000000000000000000000000000000000000000000000000000080",
	SUPER_TRANSFERVALUE              :"0x0000000000000000000000000000000000000000000000000000000000000100",
	TRANSFERVALUE                    :"0x0000000000000000000000000000000000000000000000000000000000000200",
	SUPER_CALL                       :"0x0000000000000000000000000000000000000000000000000000000000000400",
	CALL                             :"0x0000000000000000000000000000000000000000000000000000000000000800",
	SUPER_STATICCALL                 :"0x0000000000000000000000000000000000000000000000000000000000001000",
	STATICCALL                       :"0x0000000000000000000000000000000000000000000000000000000000002000",
	SUPER_DELEGATECALL               :"0x0000000000000000000000000000000000000000000000000000000000004000",
	DELEGATECALL                     :"0x0000000000000000000000000000000000000000000000000000000000008000",
	DEPLOY                           :"0x0000000000000000000000000000000000000000000000000000000000010000",
	SUPER_SETDATA                    :"0x0000000000000000000000000000000000000000000000000000000000020000",
	SETDATA                          :"0x0000000000000000000000000000000000000000000000000000000000040000",
	ENCRYPT                          :"0x0000000000000000000000000000000000000000000000000000000000080000",
	DECRYPT                          :"0x0000000000000000000000000000000000000000000000000000000000100000",
	SIGN                             :"0x0000000000000000000000000000000000000000000000000000000000200000",
}

const LSP1_TYPE_IDS = {
	// keccak256('LSP0OwnershipTransferStarted')
	LSP0OwnershipTransferStarted:
		'0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926',

	// keccak256('LSP0OwnershipTransferred_SenderNotification')
	LSP0OwnershipTransferred_SenderNotification:
		'0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814',

	// keccak256('LSP0OwnershipTransferred_RecipientNotification')
	LSP0OwnershipTransferred_RecipientNotification:
		'0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538',

	// keccak256('LSP7Tokens_SenderNotification')
	LSP7Tokens_SenderNotification:
		'0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea',

	// keccak256('LSP7Tokens_RecipientNotification')
	LSP7Tokens_RecipientNotification:
		'0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c',

	// keccak256('LSP8Tokens_SenderNotification')
	LSP8Tokens_SenderNotification:
		'0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00',

	// keccak256('LSP8Tokens_RecipientNotification')
	LSP8Tokens_RecipientNotification:
		'0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d',

	// keccak256('LSP9OwnershipTransferStarted')
	LSP9OwnershipTransferStarted:
		'0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f',

	// keccak256('LSP9OwnershipTransferred_SenderNotification')
	LSP9OwnershipTransferred_SenderNotification:
		'0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471',

	// keccak256('LSP9OwnershipTransferred_RecipientNotification')
	LSP9OwnershipTransferred_RecipientNotification:
		'0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c',

	// keccak256('LSP14OwnershipTransferStarted')
	LSP14OwnershipTransferStarted:
		'0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0',

	// keccak256('LSP14OwnershipTransferred_SenderNotification')
	LSP14OwnershipTransferred_SenderNotification:
		'0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c',

	// keccak256('LSP14OwnershipTransferred_RecipientNotification')
	LSP14OwnershipTransferred_RecipientNotification:
		'0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c',
};

const Errors = {
	LSP1: {
		'0xa5295345': {
			error: 'CannotRegisterEOAsAsAssets(address)',
			message:
				'LSP1: EOAs cannot call the UniversalReceiverDelegate with asset/vault typeIds',
		},
		'0x4c5e815a': {
			error: 'CallerNotLSP6LinkedTarget(address,address)',
			message: 'LSP1: Cannot write received vaults/assets on address other than the caller',
		},
		'0x114b721a': {
			error: 'NativeTokensNotAccepted()',
			message: 'LSP1: Cannot send native tokens to the UniversalReceiverDelegate',
		},
	},
	LSP4: {
		'0x85c169bd': {
			error: 'LSP4TokenNameNotEditable()',
			message: 'LSP4: Token name cannot be edited',
		},
		'0x76755b38': {
			error: 'LSP4TokenSymbolNotEditable()',
			message: 'LSP4: Token symbol cannot be edited',
		},
	},
	LSP5: {
		'0xecba7af8': {
			error: 'InvalidLSP5ReceivedAssetsArrayLength(bytes,uint256)',
			message: 'LSP5: Invalid value for `LSP5ReceivedAssets[]` (array length)',
		},
		'0x1c458e39': {
			error: 'ReceivedAssetsIndexSuperiorToUint64(uint256)',
			message:
				'LSP5: The index of the received assets cannot be registered if superior to uint64',
		},
		'0xe8a4fba': {
			error: 'ReceivedAssetsIndexSuperiorToUint128(uint256)',
			message:
				'LSP5: The index of the received assets cannot be registered if superior to uint128',
		},
	},
	LSP6: {
		'0xf292052a': {
			error: 'NoPermissionsSet(address)',
			message: 'LSP6: No permissions are set for this address.',
		},
		'0x3bdad6e6': {
			error: 'NotAuthorised(address,string)',
			message: 'LSP6: Not authorized (missing permission).',
		},
		'0x45147bce': {
			error: 'NotAllowedCall(address,address,bytes4)',
			message:
				'LSP6: not authorised to interact with `to` with the provided data payload (standard, address or function of `to` not authorised).',
		},
		'0x557ae079': {
			error: 'NotAllowedERC725YDataKey(address,bytes32)',
			message: 'LSP6: not allowed to set the ERC725Y data key.',
		},
		'0x0f7d735b': {
			error: 'NotRecognisedPermissionKey(bytes32)',
			message: 'LSP6: could not recognise the permission data key being set.',
		},
		'0xfc854579': {
			error: 'InvalidLSP6Target()',
			message: 'LSP6: cannot linked the Key Manager to address(0).',
		},
		'0xc9bd9eb9': {
			error: 'InvalidRelayNonce(address,uint256,bytes)',
			message: 'LSP6: invalid nonce provided for signer address',
		},
		'0x2ba8851c': {
			error: 'InvalidERC725Function(bytes4)',
			message: 'LSP6: unknown or invalid ERC725 function selector',
		},
		'0xed7fa509': {
			error: 'NoERC725YDataKeysAllowed(address)',
			message: 'LSP6: caller has no AllowedERC725YDataKeys',
		},
		'0x4f0dfdda': {
			error: 'InvalidEncodedAllowedERC725YDataKeys(bytes)',
			message:
				'LSP6: Invalid Encoding for the Compact Bytes Array of Allowed ERC725Y Data Keys.',
		},
		'0x8f4afa38': {
			error: 'AddressPermissionArrayIndexValueNotAnAddress(bytes32,bytes)',
			message: 'LSP6: value provided for AddressPermission[index] is not an address.',
		},
		'0x55a187db': {
			error: 'BatchExecuteParamsLengthMismatch()',
			message:
				'LSP6: different number of elements for each array parameters in batch `execute(uint256[],bytes[])`',
		},
		'0xb4d50d21': {
			error: 'BatchExecuteRelayCallParamsLengthMismatch()',
			message:
				'LSP6: different number of elements for each array parameters in batch `executeRelayCall(bytes[],uint256[],bytes[])`',
		},
		'0x30a324ac': {
			error: 'LSP6BatchInsufficientValueSent(uint256,uint256)',
			message: 'LSP6: `msg.value` sent is not enough to cover all the combined `values[]`.',
		},
		'0xa51868b6': {
			error: 'LSP6BatchExcessiveValueSent(uint256,uint256)',
			message: 'LSP6: cannot send more `msg.value` than all the combined `values[]`.',
		},
		'0x6cb60587': {
			error: 'NoCallsAllowed(address)',
			message: 'LSP6: No calls allowed for the provided address',
		},
		'0x6fd203c5': {
			error: 'InvalidWhitelistedCall(address)',
			message: 'LSP6: LSP6: Not allowed to whitelist all calls in AllowedCalls.',
		},
		'0x80d6ebae': {
			error: 'DelegateCallDisallowedViaKeyManager()',
			message: 'LSP6: DelegateCall is disallowed via the Key Manager',
		},
		'0x3621bbcc': {
			error: 'InvalidPayload(bytes)',
			message: 'LSP6: Invalid Payload',
		},
	},
	LSP7: {
		'0x08d47949': {
			error: 'LSP7AmountExceedsBalance(uint256,address,uint256)',
			message: "LSP7: token amount exceeds sender's balance.",
		},
		'0xf3a6b691': {
			error: 'LSP7AmountExceedsAuthorizedAmount(address,uint256,address,uint256)',
			message: "LSP7: token amount exceeds operator's allowance.",
		},
		'0x6355e766': {
			error: 'LSP7CannotUseAddressZeroAsOperator()',
			message: 'LSP7: cannot authorize address(0) as operator for LSP7 token.',
		},
		'0xd2d5ec30': {
			error: 'LSP7CannotSendWithAddressZero()',
			message: 'LSP7: cannot send token with address(0).',
		},
		'0xb9afb000': {
			error: 'LSP7CannotSendToSelf()',
			message: 'LSP7: `from` and `to` address cannot be the same',
		},
		'0x263eee8d': {
			error: 'LSP7InvalidTransferBatch()',
			message: 'LSP7: invalid transfer batch.',
		},
		'0xa608fbb6': {
			error: 'LSP7NotifyTokenReceiverContractMissingLSP1Interface(address)',
			message: 'LSP7: token recipient does not implement LSP1 standard.',
		},
		'0x26c247f4': {
			error: 'LSP7NotifyTokenReceiverIsEOA(address)',
			message: 'LSP7: token recipient is an Externally Owned Account.',
		},
		dab75047: {
			error: 'LSP7TokenOwnerCannotBeOperator()',
			message: 'LSP7: token owner cannot be an operator.',
		},
	},
	LSP7CappedSupply: {
		'0xacf1d8c5': {
			error: 'LSP7CappedSupplyRequired()',
			message: 'LSP7CappedSupply: cap supply number required',
		},
		'0xeacbf0d1': {
			error: 'LSP7CappedSupplyCannotMintOverCap()',
			message: 'LSP7CappedSupply: cannot mint over the max cap supply',
		},
	},
	LSP8: {
		'0xae8f9a36': {
			error: 'LSP8NonExistentTokenId(bytes32)',
			message: 'LSP8: token id does not exist.',
		},
		'0x5b271ea2': {
			error: 'LSP8NotTokenOwner(address,bytes32,address)',
			message: 'LSP8: tokenOwner given as parameter does not own this token id.',
		},
		'0x1294d2a9': {
			error: 'LSP8NotTokenOperator(bytes32,address)',
			message: 'LSP8: caller is not an operator for this token id.',
		},
		'0x9577b8b3': {
			error: 'LSP8CannotUseAddressZeroAsOperator()',
			message: 'LSP8: cannot use address(0) as an operator for token id.',
		},
		'0x24ecef4d': {
			error: 'LSP8CannotSendToAddressZero()',
			message: 'LSP8: cannot send to address(0).',
		},
		'0x5d67d6c1': {
			error: 'LSP8CannotSendToSelf()',
			message: 'LSP8: the `from` and `to` address cannot be the same on transfer.',
		},
		'0x34c7b511': {
			error: 'LSP8TokenIdAlreadyMinted(bytes32)',
			message: 'LSP8: tokenId already exist (= already minted).',
		},
		'0x93a83119': {
			error: 'LSP8InvalidTransferBatch()',
			message: 'LSP8: invalid transfer batch.',
		},
		'0x4349776d': {
			error: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface(address)',
			message: 'LSP8: token recipient does not implement LSP1 standard.',
		},
		'0x03173137': {
			error: 'LSP8NotifyTokenReceiverIsEOA(address)',
			message: 'LSP8: token recipient is an Externally Owned Account.',
		},
		'0x4aa31a8c': {
			error: 'LSP8NonExistingOperator(address,bytes32)',
			message: 'LSP8: Cannot remove a non existing operator.',
		},
		'0xa7626b68': {
			error: 'LSP8OperatorAlreadyAuthorized(address,bytes32)',
			message: 'LSP8: Cannot authorize an existing operator twice for the same tokenId.',
		},
		'0x89fdad62': {
			error: 'LSP8TokenOwnerCannotBeOperator()',
			message: 'LSP8: Cannot authorize the token owner as an operator.',
		},
	},
	LSP8CappedSupply: {
		'0x38d9fc30': {
			error: 'LSP8CappedSupplyRequired()',
			message: 'LSP8CappedSupply: cap supply number required',
		},
		'0xe8ba2291': {
			error: 'LSP8CappedSupplyCannotMintOverCap()',
			message: 'LSP8CappedSupply: cannot mint over the max cap supply',
		},
	},
	LSP9: {
		'0x199611f': {
			error: 'LSP1DelegateNotAllowedToSetDataKey(bytes32)',
			message: 'The UniversalReceiverDelegate is not allowed to set this data key',
		},
	},
	LSP11: {
		'0x5560e16': {
			error: 'CallerIsNotGuardian(address)',
			message: 'LSP11: The caller is not a guardian',
		},
		'0xd52858db': {
			error: 'GuardianAlreadyExist(address)',
			message: 'LSP11: The address provided is already a guardian',
		},
		'0x3d8e524e': {
			error: 'GuardianDoNotExist(address)',
			message: 'LSP11: The address provided is not an existing guardian',
		},
		'0x27113777': {
			error: 'GuardiansNumberCannotGoBelowThreshold(uint256)',
			message: 'LSP11: The guardian number cannot go below the guardians threshold',
		},
		'0xe3db80bd': {
			error: 'ThresholdCannotBeHigherThanGuardiansNumber(uint256,uint256)',
			message: 'LSP11: The guardian threshold cannot be higher than the guardians number',
		},
		'0x7f617002': {
			error: 'SecretHashCannotBeZero()',
			message: 'LSP11: The secret hash cannot be bytes32(0)',
		},
		'0xf78f0507': {
			error: 'ThresholdNotReachedForRecoverer(address,uint256,uint256)',
			message: "LSP11: The caller cannot recover as he didn't reach the guardians threshold",
		},
		'0x6fa723c3': {
			error: 'WrongPlainSecret()',
			message:
				'LSP11: The plain secret provided do not produce the secret hash set by the owner',
		},
		'0x0855380c': {
			error: 'AddressZeroNotAllowed()',
			message: 'LSP11: The address zero is not allowed to call recoverOwnership function',
		},
	},
	LSP14Ownable2Step: {
		'0x8b9bf507': {
			error: 'NotInRenounceOwnershipInterval(uint256,uint256)',
			message:
				'LSP14: Second renounce ownership call available after 100 block delay from the first call',
		},
		'0x43b248cd': {
			error: 'CannotTransferOwnershipToSelf()',
			message: 'LSP14: Cannot transfer ownership to address(this)',
		},
	},
	LSP17ContractExtension: {
		'0xbb370b2b': {
			error: 'NoExtensionFoundForFunctionSelector(bytes4)',
			message:
				'The function being called on the contract is not supported and there is no extension for it',
		},
	},
};

const EventSignatures = {
	ERC173: {
		/**
		 * event OwnershipTransferred(
		 *    address indexed previousOwner,
		 *    address indexed newOwner,
		 * );
		 *
		 * signature = keccak256('OwnershipTransferred(address,address)')
		 */
		OwnershipTransfered: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
	},
	ERC725X: {
		/**
		 * event ContractCreated(
		 *     uint256 indexed _operation,
		 *     address indexed _contractAddress,
		 *     uint256 indexed _value
		 *     bytes32 _salt
		 * );
		 *
		 * signature = keccak256('ContractCreated(uint256,address,uint256,bytes32)')
		 */
		ContractCreated: '0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3',
		/**
		 * event Executed(
		 *      uint256 indexed _operation,
		 *      address indexed _to,
		 *      uint256 indexed _value,
		 *      bytes4 _data
		 * );
		 *
		 * signature = keccak256('Executed(uint256,address,uint256,bytes4)')
		 */
		Executed: '0x4810874456b8e6487bd861375cf6abd8e1c8bb5858c8ce36a86a04dabfac199e',
	},
	ERC725Y: {
		/**
		 * event DataChanged(
		 * 		bytes32 indexed dataKey,
		 * 		bytes dataValue
		 * );
		 *
		 * signature = keccak256('DataChanged(bytes32,bytes)')
		 */
		DataChanged: '0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2',
	},
	// ERC725Account
	LSP0: {
		/**
		 * event ValueReceived(
		 *      address indexed sender,
		 *      uint256 indexed value
		 * );
		 *
		 * signature = keccak256('ValueReceived(address,uint256)')
		 */
		ValueReceived: '0x7e71433ddf847725166244795048ecf3e3f9f35628254ecbf736056664233493',
	},
	LSP1: {
		/**
		 * event UniversalReceiver(
		 *    address indexed from,
		 * 	  uint256 indexed value,
		 *    bytes32 indexed typeId,
		 *    bytes receivedData,
		 *    bytes returnedValue
		 * );
		 *
		 * signature = keccak256('UniversalReceiver(address,uint256,bytes32,bytes,bytes)')
		 */
		UniversalReceiver: '0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2',
	},
	LSP6: {
		/**
		 * event Executed(
		 *     bytes4 indexed selector,
		 *     uint256 indexed value
		 * );
		 *
		 * signature = keccak256('Executed(bytes4,uint256)')
		 */
		Executed: '0x4004d18dc05f04c061c306cbb394d4083af494786ab828142d6118ab2c43a492',
	},
	LSP7: {
		/**
		 * event Transfer(
		 *     address indexed operator,
		 *     address indexed from,
		 *     address indexed to,
		 *     uint256 amount,
		 *     bool allowNonLSP1Recipient,
		 *     bytes data
		 * );
		 *
		 * signature = keccak256('Transfer(address,address,address,uint256,bool,bytes)')
		 */
		Transfer: '0x3997e418d2cef0b3b0e907b1e39605c3f7d32dbd061e82ea5b4a770d46a160a6',
		/**
		 * event AuthorizedOperator(
		 *     address indexed operator,
		 *     address indexed tokenOwner,
		 *     uint256 indexed amount
		 * );
		 *
		 * signature = keccak256('AuthorizedOperator(address,address,uint256)')
		 */
		AuthorizedOperator: '0xd66aff874162a96578e919097b6f6d153dfd89a5cec41bb331fdb0c4aec16e2c',
		/**
		 * event RevokedOperator(
		 *     address indexed operator,
		 *     address indexed tokenOwner
		 * );
		 *
		 * signature = keccak256('RevokedOperator(address,address)')
		 */
		RevokedOperator: '0x50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa1',
	},
	LSP8: {
		/**
		 * event Transfer(
		 *     address operator,
		 *     address indexed from,
		 *     address indexed to,
		 *     bytes32 indexed tokenId,
		 *     bool allowNonLSP1Recipient,
		 *     bytes data
		 * );
		 *
		 * signature = keccak256('Transfer(address,address,address,bytes32,bool,bytes)')
		 */
		Transfer: 'b333c813a7426a7a11e2b190cad52c44119421594b47f6f32ace6d8c7207b2bf',
		/**
		 * event AuthorizedOperator(
		 *     address indexed operator,
		 *     address indexed tokenOwner,
		 *     bytes32 indexed tokenId
		 * );
		 *
		 * signature = keccak256('AuthorizedOperator(address,address,bytes32)')
		 */
		AuthorizedOperator: '34b797fc5a526f7bf1d2b5de25f6564fd85ae364e3ee939aee7c1ac27871a988',
		/**
		 * event RevokedOperator(
		 *     address indexed operator,
		 *     address indexed tokenOwner,
		 *     bytes32 indexed tokenId
		 * );
		 *
		 * signature = keccak256('RevokedOperator(address,address,bytes32)')
		 */
		RevokedOperator: '17d5389f6ab6adb2647dfa0aa365c323d37adacc30b33a65310b6158ce1373d5',
	},
	LSP9: {
		/**
		 * event ValueReceived(
		 *      address indexed sender,
		 *      uint256 indexed value
		 * );
		 *
		 * signature = keccak256('ValueReceived(address,uint256)')
		 */
		ValueReceived: '0x7e71433ddf847725166244795048ecf3e3f9f35628254ecbf736056664233493',
	},
	LSP11: {
		/**
		 * event GuardianAdded(address indexed newGuardian);
		 *
		 * signature = keccak256('GuardianAdded(address)')
		 */
		GuardianAdded: '0x038596bb31e2e7d3d9f184d4c98b310103f6d7f5830e5eec32bffe6f1728f969',

		/**
		 * event GuardianRemoved(address indexed removedGuardian);
		 *
		 * signature = keccak256('GuardianRemoved(address)')
		 */
		GuardianRemoved: '0xb8107d0c6b40be480ce3172ee66ba6d64b71f6b1685a851340036e6e2e3e3c52',

		/**
		 * event GuardiansThresholdChanged(uint256 indexed guardianThreshold);
		 *
		 * signature = keccak256('GuardiansThresholdChanged(uint256)')
		 */
		GuardiansThresholdChanged:
			'0x7146d20a2c7b7c75c203774c9f241b61698fac43a4a81ccd828f0d8162392790',

		/**
		 * event SecretHashChanged(bytes32 indexed secretHash);
		 *
		 * signature = keccak256('SecretHashChanged(bytes32)')
		 */
		SecretHashChanged: '0x2e8c5419a62207ade549fe0b66c1c85c16f5e1ed654815dee3a3f3ac41770df3',

		/**
		 * event SelectedNewController(
		 *      uint256 indexed recoveryCounter,
		 *      address indexed guardian,
		 *      address indexed addressSelected
		 * );
		 *
		 * signature = keccak256('SelectedNewController(uint256,address,address)')
		 */
		SelectedNewController: '0xe43f3c1093c69ab76b2cf6246090acb2f8eab7f19ba9942dfc8b8ec446e3a3de',

		/**
		 * event RecoveryProcessSuccessful(
		 *      uint256 indexed recoveryCounter,
		 *      address indexed newController,
		 *      bytes32 indexed newSecretHash,
		 *      address[] guardians
		 * );
		 *
		 * signature = keccak256('RecoveryProcessSuccessful(uint256,address,bytes32,address[])')
		 */
		RecoveryProcessSuccessful:
			'0xf4ff8803d6b43af46d48c200977209829c2f42f19f27eda1c89dbf26a28009cd',
	},
	Helpers: {
		/**
		 * event ReceivedERC777(
		 *    address indexed token,
		 *    address indexed _operator,
		 *    address indexed _from,
		 *    address _to,
		 *    uint256 _amount
		 * );
		 *
		 * signature = keccak256('ReceivedERC777(address,address,address,address,uint256)')
		 */
		ReceivedERC777: '0xdc38539587ea4d67f9f649ad9269646bab26927bad175bdcdfdab5dd297d5e1c',
	},
	LSP14Ownable2Step: {
		/**
		 * event OwnershipTransferStarted(
		 *    address indexed previousOwner,
		 *    address indexed newOwner
		 * );
		 *
		 * signature = keccak256('OwnershipTransferStarted(address,address)')
		 */
		OwnershipTransferStarted:
			'0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700',
		/**
		 * event RenounceOwnershipStarted();
		 *
		 * signature = keccak256('RenounceOwnershipStarted()')
		 */
		RenounceOwnershipStarted:
			'0x81b7f830f1f0084db6497c486cbe6974c86488dcc4e3738eab94ab6d6b1653e7',
		/**
		 * event OwnershipRenounced();
		 *
		 * signature = keccak256('OwnershipRenounced()')
		 */
		OwnershipRenounced: '0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce',
	},
	LSP16UniversalFactory: {
		/**
		 * event ContractCreated(
		 *    address indexed contractCreated,
		 *    bytes32 indexed providedSalt,
		 *    bool indexed initializable,
		 *    bytes initializeCalldata
		 * );
		 *
		 * signature = keccak256('ContractCreated(address,bytes32,bool,bytes)')
		 */
		ContractCreated: '0xc587425c92859c27d4383bf2eb0ab8ea1670c48039f8d6375b9947b82a20f746',
	},
};

module.exports = {
	INTERFACE_IDS,
	ERC1271_VALUES,
	OPERATION_TYPES,
	SupportedStandards,
	ERC725YDataKeys,
	BasicUPSetup_Schema,
	LSP6_VERSION,
	ALL_PERMISSIONS,
	PERMISSIONS,
	LSP1_TYPE_IDS,
	Errors,
	EventSignatures,
};
