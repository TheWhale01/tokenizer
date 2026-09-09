// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Whale42 is ERC20, ERC20Burnable, Ownable {
    uint8 private constant _CUSTOM_DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** _CUSTOM_DECIMALS;

    constructor() ERC20("whale42", "WH42") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
