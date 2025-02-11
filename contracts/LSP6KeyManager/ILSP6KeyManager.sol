// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// interfaces
import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";

/**
 * @dev Contract acting as a controller of an ERC725 Account, using permissions stored in the ERC725Y storage
 */
interface ILSP6KeyManager is
    IERC1271
    /* is ERC165 */
{
    event Executed(bytes4 indexed selector, uint256 indexed value);

    /**
     * @notice returns the address of the account linked to this KeyManager
     * @dev this can be a contract that implements
     *  - ERC725X only
     *  - ERC725Y only
     *  - any ERC725 based contract (so implementing both ERC725X and ERC725Y)
     *
     * @return the address of the linked account
     */
    function target() external view returns (address);

    /**
     * @notice get latest nonce for `from` in channel ID: `channelId`
     * @dev use channel ID = 0 for sequential nonces, any other number for out-of-order execution (= execution in parallel)
     * @param from the caller or signer address
     * @param channelId the channel id to retrieve the nonce from
     */
    function getNonce(address from, uint128 channelId) external view returns (uint256);

    /**
     * @notice execute the following payload on the ERC725Account: `payload`
     * @dev the ERC725Account will return some data on successful call, or revert on failure
     * @param payload the payload to execute. Obtained in web3 via encodeABI()
     * @return the data being returned by the ERC725 Account
     */
    function execute(bytes calldata payload) external payable returns (bytes memory);

    /**
     * @dev batch `execute(bytes)`
     */
    function execute(uint256[] calldata values, bytes[] calldata payloads)
        external
        payable
        returns (bytes[] memory);

    /**
     * @dev allows anybody to execute given they have a signed message from an executor
     * @param signature bytes32 ethereum signature
     * @param nonce the address' nonce (in a specific `_channel`), obtained via `getNonce(...)`. Used to prevent replay attack
     * @param payload obtained via encodeABI() in web3
     * @return the data being returned by the ERC725 Account
     */
    function executeRelayCall(
        bytes calldata signature,
        uint256 nonce,
        bytes calldata payload
    ) external payable returns (bytes memory);

    /**
     * @dev batch `executeRelayCall(...)`
     */
    function executeRelayCall(
        bytes[] calldata signatures,
        uint256[] calldata nonces,
        uint256[] calldata values,
        bytes[] calldata payloads
    ) external payable returns (bytes[] memory);
}
