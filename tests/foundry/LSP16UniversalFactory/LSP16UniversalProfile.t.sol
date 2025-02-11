// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import "./LSP16Mock.sol";
import "../../../contracts/Mocks/NonPayableFallback.sol";
import "../../../contracts/Mocks/FallbackInitializer.sol";
import "../../../contracts/LSP0ERC725Account/LSP0ERC725Account.sol";
import "../../../contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol";

contract LSP16UniversalProfileTest is Test {
    LSP16Mock public lsp16;
    NonPayableFallback public nonPayableFallbackContract;
    FallbackInitializer public fallbackInitializer;
    LSP0ERC725Account public lsp0;
    LSP0ERC725AccountInit public lsp0Init;

    bytes public nonPayableFallbackBytecode = type(NonPayableFallback).creationCode;

    bytes32 public uniqueInitializableSalt;
    bytes32 public uniqueNonInitializableSalt;
    bytes public initializeCallDataBytes =
        abi.encodePacked(block.timestamp, block.difficulty, block.number);
    bytes32 public randomBytes32ForSalt = keccak256(initializeCallDataBytes);

    uint256 public testCounter;

    function setUp() public {
        lsp16 = new LSP16Mock();

        nonPayableFallbackContract = new NonPayableFallback();
        fallbackInitializer = new FallbackInitializer();
        lsp0Init = new LSP0ERC725AccountInit();
        lsp0 = new LSP0ERC725Account(address(20));

        uniqueInitializableSalt = lsp16.generateSalt(
            true,
            initializeCallDataBytes,
            randomBytes32ForSalt
        );
        uniqueNonInitializableSalt = lsp16.generateSalt(false, "", randomBytes32ForSalt);
    }

    // testing that salt initialized with initializable == true cannot be the same as one with initializable == false
    function testInitializableSaltAlwaysUnique(
        bytes memory initializeCallData,
        bytes32 providedSalt
    ) public view {
        bytes32 salt = lsp16.generateSalt(false, initializeCallData, providedSalt);
        assert(salt != uniqueInitializableSalt);
    }

    // testing that salt initialized with initializable == false cannot be the same as one with initializable == true
    function testNonInitializableSaltAlwaysUnique(
        bytes memory initializeCallData,
        bytes32 providedSalt
    ) public view {
        bytes32 salt = lsp16.generateSalt(true, initializeCallData, providedSalt);
        assert(salt != uniqueNonInitializableSalt);
    }

    // testing that with when initializeCallDataBytes is different salt cannot be the same
    function testSaltAlwaysUniqueWithDifferentRandomBytes(bytes memory initializeCallData)
        public
        view
    {
        if (keccak256(initializeCallDataBytes) == keccak256(initializeCallData)) return;
        bytes32 salt = lsp16.generateSalt(true, initializeCallData, randomBytes32ForSalt);
        assert(salt != uniqueInitializableSalt);
    }

    // testing that when randomBytes32ForSalt is different salt cannot be the same
    function testSaltAlwaysUniqueWithDifferentRandomSalt(bytes32 providedSalt) public view {
        if (randomBytes32ForSalt == providedSalt) return;
        bytes32 salt = lsp16.generateSalt(true, initializeCallDataBytes, providedSalt);
        assert(salt != uniqueInitializableSalt);
    }

    function testDeployCreate2ProxyWithUPInit() public {
        bytes32 salt = lsp16.generateSalt(false, "", bytes32(++testCounter));

        (bool success, bytes memory returnData) = address(lsp16).call(
            abi.encodeWithSignature("deployCreate2Proxy(address,bytes32)", address(lsp0Init), salt)
        );
        Address.verifyCallResult(success, returnData, "call should have succeeded");
    }

    function testDeployCreate2ProxyInitShouldNotKeepValueWithUPInit(
        uint256 valueToTransfer,
        bytes memory initializeCalldata
    ) public {
        vm.deal(address(this), valueToTransfer);

        assert(address(this).balance == valueToTransfer);

        bytes32 salt = lsp16.generateSalt(true, initializeCalldata, bytes32(++testCounter));
        bytes memory lsp0Initbytes = abi.encodeWithSignature("initialize(address)", address(this));

        (bool success, bytes memory returndata) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2ProxyInit(address,bytes32,bytes)",
                address(lsp0Init),
                salt,
                lsp0Initbytes
            )
        );
        Address.verifyCallResult(success, returndata, "call should have succeeded");
        assert(address(lsp16).balance == 0);
    }

    function testDeployCreate2ShouldNotKeepValueWithUP(uint256 valueToTransfer) public {
        vm.deal(address(this), valueToTransfer);
        assert(address(this).balance == valueToTransfer);

        bytes32 salt = lsp16.generateSalt(false, "", bytes32(++testCounter));

        (bool success, bytes memory returnData) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2(bytes,bytes32)",
                abi.encodePacked(type(LSP0ERC725Account).creationCode, abi.encode(address(this))),
                salt
            )
        );
        Address.verifyCallResult(success, returnData, "call should have succeeded");
        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testDeployCreate2InitShouldNotKeepValueWithUPInit(
        uint128 valueForInitializer,
        bytes4 initilializerBytes
    ) public {
        vm.deal(address(this), valueForInitializer);
        assert(address(this).balance == valueForInitializer);

        bytes32 salt = lsp16.generateSalt(true, bytes("randomBytes"), bytes32(++testCounter));

        (bool success, bytes memory returndata) = address(lsp16).call{value: valueForInitializer}(
            abi.encodeWithSignature(
                "deployCreate2Init(bytes,bytes32,bytes,uint256,uint256)",
                type(LSP0ERC725AccountInit).creationCode,
                salt,
                _removeRandomByteFromBytes4(initilializerBytes),
                0, // constructor is not payable
                valueForInitializer
            )
        );
        Address.verifyCallResult(success, returndata, "call should have succeeded");
        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testDeployCreate2ProxyShouldNotKeepValueWithNonPayableFallback(uint256 valueToTransfer)
        public
    {
        vm.deal(address(this), valueToTransfer);

        assert(address(this).balance == valueToTransfer);

        (bool success, ) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2Proxy(address,bytes32)",
                address(nonPayableFallbackContract),
                abi.encodePacked("fallback()")
            )
        );
        if (success && valueToTransfer > 0) {
            revert("call should have failed");
        }

        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testDeployCreate2ProxyInitShouldNotKeepValueWithNonPayableFallback(
        uint256 valueToTransfer
    ) public {
        vm.deal(address(this), valueToTransfer);

        assert(address(this).balance == valueToTransfer);

        bytes memory initializeCalldata = abi.encodePacked("initialize(address)", address(this));
        bytes32 salt = lsp16.generateSalt(true, initializeCalldata, bytes32(++testCounter));

        (bool success, ) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2ProxyInit(address,bytes32,bytes)",
                address(lsp0Init),
                salt,
                initializeCalldata
            )
        );
        if (success && valueToTransfer > 0) {
            revert("call should have failed");
        }

        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testDeployCreate2ShouldNotKeepValueWithNonPayableFallback(uint256 valueToTransfer)
        public
    {
        vm.deal(address(this), valueToTransfer);

        assert(address(this).balance == valueToTransfer);

        (bool success, ) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2(address,bytes32)",
                nonPayableFallbackBytecode,
                bytes32(0)
            )
        );
        if (success && valueToTransfer > 0) {
            revert("call should have failed");
        }

        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testDeployCreate2InitShouldNotKeepValueWithNonPayableFallback(
        uint128 valueForConstructor,
        uint128 valueForInitializer,
        bytes calldata initializeCalldata
    ) public {
        uint256 valueToTransfer = uint256(valueForConstructor) + uint256(valueForInitializer);

        vm.deal(address(this), valueToTransfer);
        assert(address(this).balance == valueToTransfer);

        bytes32 salt = lsp16.generateSalt(true, initializeCalldata, bytes32(++testCounter));

        (bool success, ) = address(lsp16).call{value: valueToTransfer}(
            abi.encodeWithSignature(
                "deployCreate2Init(bytes,bytes32,bytes,uint256,uint256)",
                type(NonPayableFallback).creationCode,
                salt,
                initializeCalldata,
                valueForConstructor,
                bytes("fallback()")
            )
        );
        if (success && valueToTransfer > 0) {
            revert("call should have failed");
        }
        require(address(lsp16).balance == 0, "LSP16 should not have any balance");
    }

    function testCalculateAddressShouldReturnCorrectUPAddressWithDeployCreate2Init(
        bytes32 providedSalt,
        uint256 valueForInitializer,
        bytes4 initilializerBytes
    ) public {
        vm.deal(address(this), valueForInitializer);
        assert(address(this).balance == valueForInitializer);

        bytes memory initializeCallData = _removeRandomByteFromBytes4(initilializerBytes);

        address expectedAddress = lsp16.calculateAddress(
            keccak256(type(LSP0ERC725AccountInit).creationCode),
            providedSalt,
            true,
            initializeCallData
        );
        (bool success, bytes memory returnedData) = address(lsp16).call{value: valueForInitializer}(
            abi.encodeWithSignature(
                "deployCreate2Init(bytes,bytes32,bytes,uint256,uint256)",
                type(LSP0ERC725AccountInit).creationCode,
                providedSalt,
                initializeCallData,
                0,
                valueForInitializer
            )
        );

        Address.verifyCallResult(success, returnedData, "call should have succeeded");

        address returnedAddress = abi.decode(returnedData, (address));
        assert(expectedAddress == returnedAddress);
    }

    function testCalculateAddressShouldReturnCorrectUPAddressWithDeployCreate2(
        bytes32 providedSalt,
        uint256 valueForConstructor
    ) public {
        vm.deal(address(this), valueForConstructor);
        assert(address(this).balance == valueForConstructor);

        address expectedAddress = lsp16.calculateAddress(
            keccak256(
                abi.encodePacked(type(LSP0ERC725Account).creationCode, abi.encode(address(this)))
            ),
            providedSalt,
            false,
            ""
        );
        (bool success, bytes memory returnedData) = address(lsp16).call{value: valueForConstructor}(
            abi.encodeWithSignature(
                "deployCreate2(bytes,bytes32)",
                abi.encodePacked(type(LSP0ERC725Account).creationCode, abi.encode(address(this))),
                providedSalt
            )
        );
        Address.verifyCallResult(success, returnedData, "call should have succeeded");

        address returnedAddress = abi.decode(returnedData, (address));
        assert(expectedAddress == returnedAddress);
    }

    function testCalculateProxyAddressWithDeployCreate2ProxyInit(
        bytes32 providedSalt,
        uint256 valueForInitializer,
        bytes4 initilializerBytes
    ) public {
        vm.deal(address(this), valueForInitializer);
        assert(address(this).balance == valueForInitializer);

        bytes memory initializeCallData = _removeRandomByteFromBytes4(initilializerBytes);

        address expectedAddress = lsp16.calculateProxyAddress(
            address(lsp0Init),
            providedSalt,
            true,
            initializeCallData
        );
        (bool success, bytes memory returnedData) = address(lsp16).call{value: valueForInitializer}(
            abi.encodeWithSignature(
                "deployCreate2ProxyInit(address,bytes32,bytes)",
                address(lsp0Init),
                providedSalt,
                initializeCallData
            )
        );
        Address.verifyCallResult(success, returnedData, "call should have succeeded");

        address returnedAddress = abi.decode(returnedData, (address));
        assert(expectedAddress == returnedAddress);
    }

    function testCalculateProxyAddressWithDeployCreate2Proxy(bytes32 providedSalt) public {
        address expectedAddress = lsp16.calculateProxyAddress(
            address(lsp0),
            providedSalt,
            false,
            ""
        );
        (bool success, bytes memory returnedData) = address(lsp16).call(
            abi.encodeWithSignature(
                "deployCreate2Proxy(address,bytes32)",
                address(lsp0),
                providedSalt
            )
        );
        Address.verifyCallResult(success, returnedData, "call should have succeeded");

        address returnedAddress = abi.decode(returnedData, (address));
        assert(expectedAddress == returnedAddress);
    }

    /**
     * @dev Randomly removes one byte from the input bytes4 .
     * @param input The bytes4 input to remove byte from
     * @return result The new bytes which is a bytes array of length 3, it is the input bytes4 but one byte removed randomly
     */
    function _removeRandomByteFromBytes4(bytes4 input) internal view returns (bytes memory) {
        uint256 randomByteIndex = uint256(keccak256(abi.encodePacked(block.timestamp))) % 4;
        bytes memory result = new bytes(3);
        for (uint8 i = 0; i < 3; i++) {
            if (i < randomByteIndex) {
                result[i] = input[i];
            } else {
                result[i] = input[i + 1];
            }
        }
        return result;
    }
}
