

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { Script } from "forge-std/Script.sol";

import { Strawberry } from "../src/Strawberry.sol";
import { Vendor } from "../src/Vendor.sol";


contract DeploySystem is Script {
	uint256 public constant AMOUNT_TO_SELL = 100_000;

	function run() external {
		vm.startBroadcast();
			deploy();
		vm.stopBroadcast();
	}

	function deploy() public returns (Strawberry, Vendor) {
		Strawberry strawberryContract = new Strawberry();
		Vendor vendorContract = new Vendor(address(strawberryContract));
		strawberryContract.transfer(address(vendorContract), AMOUNT_TO_SELL * 10 ** strawberryContract.decimals());
		return (strawberryContract, vendorContract);
	}
}