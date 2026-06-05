

// SPDX-License-Identifier: MIT  

pragma solidity ^0.8.26;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";


contract Strawberry is ERC20, Ownable {
	uint256 constant INITIAL_SUPPLY = 1_000_000; // 1,000,000 tokens

	constructor() ERC20("Strawberry", "STRAWBERRY") Ownable(msg.sender) {
		_mint(msg.sender, INITIAL_SUPPLY * 10 ** decimals());
	}
}