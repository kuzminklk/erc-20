

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { console, Test } from "forge-std/Test.sol";

import { Strawberry } from "../src/Strawberry.sol";
import { Vendor } from "../src/Vendor.sol";
import { DeploySystem } from "../script/DeploySystem.s.sol";


/**
 * @notice 
 */
contract TestSystem is Test {
	uint256 public constant USER_1_ETHER_BALANCE = 100000 ether;

	DeploySystem public deployer;
	Strawberry public strawberryContract;
	Vendor public vendorContract;
	
	address public user1 = makeAddr("user1");

	function setUp() public {
		vm.deal(user1, USER_1_ETHER_BALANCE);

		deployer = new DeploySystem();
		(strawberryContract, vendorContract) = deployer.deploy();
	}

	function test_Buy_WhenEnoughSupply_UserReceivesTokens() public {
		uint256 amountToBuy = 1 ether;
		uint256 expectedAmountOfTokens = amountToBuy * vendorContract.TOKENS_PER_ETH();

		vm.startPrank(user1);
			vendorContract.buyTokens{ value: amountToBuy }();
		vm.stopPrank();

		uint256 userTokensBalance = strawberryContract.balanceOf(user1);
		assertEq(userTokensBalance, expectedAmountOfTokens);
	} 

	function test_Buy_WhenNotEnoughSupply_Reverts() public {
		uint256 amountToBuy = 10000 ether;
		uint256 expectedAmountOfTokens = amountToBuy * vendorContract.TOKENS_PER_ETH();

		vm.startPrank(user1);
			vm.expectRevert(Vendor.NotEnoughTokensInVendor.selector);
			vendorContract.buyTokens{ value: amountToBuy }();
		vm.stopPrank();
	} 
}