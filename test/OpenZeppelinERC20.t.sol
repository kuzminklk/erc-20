

// SPDX-License-Identifier: MIT  

pragma solidity ^0.8.26;

import { Test } from "forge-std/Test.sol";

import { KBYN } from "../src/OpenZeppelinERC20.sol";
import { DeployOpenZeppelinERC20 } from "../script/DeployOpenZeppelinERC20.s.sol";


contract OpenZeppelinERC20Test is Test {

	uint256 constant STARTING_BALANCE = 100 ether; // 100 tokens with default 1e18 percision

	KBYN public KBYNContract;
	DeployOpenZeppelinERC20 public deployer;

	address user1 = makeAddr("user1");
	address user2 = makeAddr("user2");


	function setUp() public {
		deployer = new DeployOpenZeppelinERC20();
		KBYNContract = deployer.deploy();
	}

	function test_Transfer_IncreasesUser1Balance() public {
		vm.prank(address(deployer));
			KBYNContract.transfer(user1, STARTING_BALANCE);

		assertEq(STARTING_BALANCE, KBYNContract.balanceOf(user1));
	}

	function test_AllowanceAndTransfer_DecreasesUser1BalanceIncreasesUser2Balance() public {
		vm.prank(address(deployer));
			KBYNContract.transfer(user1, STARTING_BALANCE);

		uint256 allowance = 1 ether;

		vm.prank(user1);
			KBYNContract.approve(user2, allowance);

		vm.prank(user2);
			KBYNContract.transferFrom(user1, user2, allowance);

		assertEq(KBYNContract.balanceOf(user1), STARTING_BALANCE - allowance);
		assertEq(KBYNContract.balanceOf(user2), allowance);
	}
	
}