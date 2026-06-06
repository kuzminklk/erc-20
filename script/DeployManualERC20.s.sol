

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { KBYN } from "../src/ManualERC20.sol";
import { Script } from "forge-std/Script.sol";


contract DeployManualERC20 is Script {
	function run() external returns (KBYN) {
		vm.startBroadcast();

		KBYN KBYNContract = deploy();

		vm.stopBroadcast();

		return KBYNContract;
	}

	function deploy() public returns (KBYN) {
		KBYN KBYNContract = new KBYN();
		return KBYNContract;
	}
}