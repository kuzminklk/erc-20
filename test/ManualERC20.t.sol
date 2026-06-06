

// SPDX-License-Identifier: MIT  

pragma solidity ^0.8.26;

import { Test } from "forge-std/Test.sol";

import { KBYN } from "../src/ManualERC20.sol";
import { DeployManualERC20 } from "../script/DeployManualERC20.s.sol";


contract ManualERC20Test is Test {

	uint256 constant STARTING_BALANCE = 100 ether; // 100 tokens with default 1e18 percision

	KBYN public KBYNContract;
	DeployManualERC20 public deployer;

	address user = makeAddr("user");

	function setUp() public {
		deployer = new DeployManualERC20();
		KBYNContract = deployer.deploy();
	}

	function test_Mint_IncreasesUserBalance() public {
		KBYNContract.mint(user, STARTING_BALANCE);
		assertEq(STARTING_BALANCE, KBYNContract.balanceOf(user));
	}
}