

// SPDX-License-Identifier: MIT  

pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @notice Exchange ETH for Strawberry tokens
 */
contract Vendor is Ownable {
	uint256 public constant TOKENS_PER_ETH = 100;
	IERC20 public token;

	event BoughtTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
	event Withdrawn(address owner, uint256 amountOfETH);

	error NotEnoughTokensInVendor();
	error NotEnoughETHSent();
	error TransferFailed();

	constructor(address tokenAddress) Ownable(msg.sender) {
		token = IERC20(tokenAddress);
	}

	function buyStrawberries() public payable {
		uint256 amountToBuy = msg.value * TOKENS_PER_ETH;
		uint256 vendorBalance = token.balanceOf(address(this));

		if (amountToBuy == 0) {
			revert NotEnoughETHSent();
		}

		if (vendorBalance < amountToBuy) {
			revert NotEnoughTokensInVendor();
		}

		bool success = token.transfer(msg.sender, amountToBuy);

		if (!success) {
			revert TransferFailed();
		}

		emit BoughtTokens(msg.sender, msg.value, amountToBuy);
	}

	function withdraw() public onlyOwner {
		uint256 amount = address(this).balance;
		(bool success, ) = msg.sender.call{ value: amount }("");

		if (!success) {
			revert TransferFailed();
		}

		emit Withdrawn(msg.sender, amount);
	}
}