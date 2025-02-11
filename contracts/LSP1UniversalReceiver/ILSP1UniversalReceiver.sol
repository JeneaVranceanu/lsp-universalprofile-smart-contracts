// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

/**
 * @title The interface for LSP1UniversalReceiver
 * @dev LSP1UniversalReceiver allows to receive arbitrary messages and to be informed when assets are sent or received
 */
interface ILSP1UniversalReceiver {
    /**
     * @notice Emitted when the universalReceiver function is succesfully executed
     * @param from The address calling the universalReceiver function
     * @param value The amount sent to the universalReceiver function
     * @param typeId The hash of a specific standard or a hook
     * @param receivedData The arbitrary data passed to universalReceiver function
     * @param returnedValue The value returned by the universalReceiver function
     */
    event UniversalReceiver(
        address indexed from,
        uint256 indexed value,
        bytes32 indexed typeId,
        bytes receivedData,
        bytes returnedValue
    );

    /**
     * @param typeId The hash of a specific standard or a hook
     * @param data The arbitrary data received with the call
     * @dev Emits an event when it's succesfully executed
     *
     * Call the universalReceiverDelegate function in the UniversalReceiverDelegate (URD) contract, if the address of the URD
     * was set as a value for the `_UniversalReceiverKey` in the account key/value value store of the same contract implementing
     * the universalReceiver function and if the URD contract has the LSP1UniversalReceiverDelegate Interface Id registred using ERC165
     *
     * Emits a {UniversalReceiver} event
     */
    function universalReceiver(bytes32 typeId, bytes calldata data)
        external
        payable
        returns (bytes memory);
}
