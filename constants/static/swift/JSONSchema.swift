//
//  JSONSchema.swift
//  UniversalProfile
//
//  Created by JeneaVranceanu.
//  LUKSO Blockchain GmbH © 2023
//

import Foundation

/**
 Implementation of [ERC725Y JSON Schema specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#specification ).
 */
public struct JSONSchema {
    
    public let name: String
    public let key: String
    public let keyType: JSONSchema.KeyType
    public let valueType: JSONSchema.ValueType
    public let valueContent: JSONSchema.ValueContent
    
    public enum KeyType: String {
        /// A simple key.
        case Singleton = "Singleton"
        /// An array spanning multiple ERC725Y keys.
        case Array = "Array"
        /// A key that maps two words.
        case Mapping = "Mapping"
        /// A key that maps a word, to a grouping word to an address.
        case MappingWithGrouping = "MappingWithGrouping"
    }

    public indirect enum ValueType {
        /// Boolean as one bit of data.
        case boolean
        /// UTF8 encoded string.
        case string
        /// 20 bytes address.
        case address
        /// uint up to 256 bits. 256 is default.
        case uint(_ bitCount: UInt64 = 256)
        /// int up to 256 bits. 256 is default.
        case int(_ bitCount: UInt64 = 256)
        /// Fixed size bytes of size between 1 and 32
        case bytes(_ bytesCount: UInt64 = 0)
        /// Fixed  size array.
        case array(_ type: ValueType, _ arraySize: UInt64 = 0)
        /// Array of tuples where the type of 1 tuple is a combination of types stored in `tupleType`. Size of the array is fixed.
        case compactBytesArray(_ type: ValueType, _ arraySize: UInt64 = 0)
        /// Bytes chunk that combins in itself multiple types and thus values.
        case tuple(_ types: [ValueType])

        /// Returns the actual number of bytes required to represent the type.
        /// `nil` if the type cannot be sized without knowing the value, e.g. dynamic bytes or string.
        ///
        /// Example:
        ///  - boolean requires only 1 byte (since 1 byte is the minimum) to store `true` or `false` value;
        ///  - address required 20 bytes;
        ///  - uint256 requires 32 bytes while uint16 only 2.
        public var bytesSize: UInt64? {
            switch self {
            case .boolean:
                return 1
            case .string:
                return nil
            case .address:
                return 20
            case .uint(let bitCount):
                return bitCount / 8
            case .int(let bitCount):
                return bitCount
            case .bytes(let bytesCount):
                return bytesCount == 0 ? nil : bytesCount
            case let .array(type, arraySize):
                guard arraySize > 0,
                      let subTypeSize = type.bytesSize else { return nil }
                // 32 bytes array offset = 0x0000000000000000000000000000000000000000000000000000000000000020
                // 32 * arraySize - is the bytes count for all indices of the array
                return 32 + 32 * arraySize + subTypeSize * arraySize
            case let .compactBytesArray(type, arraySize):
                guard arraySize > 0,
                      let subTypeSize = type.bytesSize else { return nil }
                // 2 * arraySize - is the bytes count for bytes that store size of each element
                return 2 * arraySize + subTypeSize * arraySize
            case .tuple(let types):
                var totalSize: UInt64 = 0
                for type in types {
                    guard let bytesSize = type.bytesSize else { return nil }
                    totalSize += bytesSize
                }
                return totalSize
            }
        }
        
        public var isArray: Bool {
            switch self {
            case .array, .compactBytesArray:
                return true
            default:
                return false
            }
        }

        /// Type that has nested types
        public var isComplexType: Bool {
            switch self {
            case .array, .compactBytesArray, .tuple:
                return true
            default:
                return false
            }
        }

        public var nestedTypes: [ValueType]? {
            switch self {
            case let .array(type, _):
                return [type]
            case let .compactBytesArray(type, _):
                return [type]
            case let .tuple(types):
                return types
            default:
                return nil
            }
        }
        
        public var rawValue: String {
            switch self {
            case .boolean:
                return "boolean"
            case .string:
                return "string"
            case .address:
                return "address"
            case .uint(let size):
                return "uint\(size)"
            case .int(let size):
                return "int\(size)"
            case .bytes(let size):
                return size == 0 ? "bytes" : "bytes\(size)"
            case .array(let type, let count):
                if count == 0 {
                    return "\(type.rawValue)[]"
                }
                return "\(type.rawValue)[\(count)]"
            case .compactBytesArray(let type, let count):
                if count == 0 {
                    return "\(type.rawValue)[CompactBytesArray]"
                }
                return "\(type.rawValue)(\(count))[CompactBytesArray]"
            case .tuple(let types):
                return "(\(types.map { $0.rawValue }.joined(separator: ",")))"
            }
        }
    }
    
    public indirect enum ValueContent {
        ///  The content are bytes.
        case Bytes
        ///  The content are bytes with length N.
        case BytesN(UInt64)
        ///  The content is a number.
        case Number
        ///  The content is a UTF8 string.
        case String
        ///  The content is an address.
        case Address
        ///  The content is an keccak256 32 bytes hash.
        case Keccak256
        ///  The content contains the hash function, hash and link to the asset file.
        case AssetURL
        ///  The content contains the hash function, hash and link to the JSON file.
        case JSONURL
        ///  The content is an URL encoded as UTF8 string.
        case URL
        ///  The content is structured Markdown mostly encoded as UTF8 string.
        case Markdown
        /// If the value content are specific bytes, than the returned value is expected to equal those bytes.
        case SpecificBytes(String)
        case Mixed
        case tuple(_ types: [ValueContent])
        
        public var rawValue: String {
            switch self {
            case .Bytes:
                return "Bytes"
            case .BytesN(let val):
                return "Bytes\(val)"
            case .Number:
                return "Number"
            case .String:
                return "String"
            case .Address:
                return "Address"
            case .Keccak256:
                return "Keccak256"
            case .AssetURL:
                return "AssetURL"
            case .JSONURL:
                return "JSONURL"
            case .URL:
                return "URL"
            case .Markdown:
                return "Markdown"
            case .SpecificBytes(let specificBytes):
                return specificBytes
            case .Mixed:
                return "Mixed"
            case .tuple(let types):
                return "(\(types.map { $0.rawValue }.joined(separator: ",")))"
            }
        }
    }
}
