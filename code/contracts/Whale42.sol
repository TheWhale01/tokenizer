// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Whale42 is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
	uint256 public constant INITIAL_SUPPLY = 42_000_000 * 10 ** 18;

	constructor() ERC20("Whale42", "WH42") Ownable(msg.sender) {
		_mint(msg.sender, INITIAL_SUPPLY);
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}

	function pause() public onlyOwner {
		_pause();
	}
	
	function unpause() public onlyOwner {
		_unpause();
	}

	function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
		super._update(from, to, value);
	}
}
