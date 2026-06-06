

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { KBYN } from "../src/OpenZeppelinERC20.sol";
import { Script } from "forge-std/Script.sol";


contract DeployOpenZeppelinERC20 is Script {
	uint256 INITIAL_SUPPLY = 100 ether;

	function run() external returns (KBYN) {
		vm.startBroadcast();

		KBYN KBYNContract = deploy();

		vm.stopBroadcast();

		return KBYNContract;
	}

	function deploy() public returns (KBYN) {
		KBYN KBYNContract = new KBYN(INITIAL_SUPPLY);
		return KBYNContract;
	}
}