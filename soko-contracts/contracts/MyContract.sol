// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // State variable to store a value
    uint256 private value;

    // Event to emit when the value is updated
    event ValueUpdated(uint256 newValue);

    // Function to set the value
    function setValue(uint256 newValue) public {
        value = newValue;
        emit ValueUpdated(newValue);
    }

    // Function to get the current value
    function getValue() public view returns (uint256) {
        return value;
    }
}