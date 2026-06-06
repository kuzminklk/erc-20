

// SPDX-License-Identifier: MIT  

pragma solidity ^0.8.26;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @notice Tokenized BYN of Kuzmin's Company
 * @dev Implements ERC-20 by OpenZeppelin's library
 */
contract KBYN is ERC20 {
	constructor(uint256 initialSupply) ERC20("Kuzmin's Company Tokenized BYN", "KBYN") {
		_mint(msg.sender, initialSupply);
	}
}