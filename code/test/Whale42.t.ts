import { expect } from "chai";
import { network } from "hardhat";
import type { Whale42 } from "../types/ethers-contracts/Whale42.js";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";

const { ethers, networkName } = await network.create();

describe("Whale42 (WH42) token", () => {
	let token: Whale42;
	let owner: HardhatEthersSigner;
	let alice: HardhatEthersSigner;
	let bob: HardhatEthersSigner;

	const INITIAL_SUPPLY: bigint = 42_000_000n * 10n ** 18n;

	beforeEach(async () => {
		[owner, alice, bob] = await ethers.getSigners();
		const whale42 = await ethers.deployContract("Whale42");
		await whale42.waitForDeployment();
	});

	it("should have the correct name and symbol", () => {
		expect(token.name).to.eq("Whale42");
		expect(token.symbol).to.eq("WH42");
	});

  it("should have 18 decimals", () => {
    expect(token.decimals).to.eq(18);
  });

  it("should min the initial supply to the deployer", () => {
    expect(token.totalSupply).to.eq(INITIAL_SUPPLY);
    expect(token.balanceOf(owner.address)).to.eq(INITIAL_SUPPLY);
  });

  it("should transfer tokens between accounts", async () => {
    const amount = 100;
    await token.transfer(alice.getAddress(), amount);
    expect(await token.balanceOf(alice.getAddress())).to.eq(amount);
  });

  it("should fail transfer if sender has insufficient balance", async () => {
    const amount = INITIAL_SUPPLY + 100n;
    await expect(token.connect(alice).transfer(bob.getAddress(), amount)).to.be.revert(ethers);
  });

  it("should prevent non owners to mint", async () => {
    const amount = ethers.parseEther("1000");
    await expect(token.connect(alice).mint(alice.getAddress(), amount)).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
  });

  it("should allow owner to mint", async () => {
    const amount = ethers.parseEther("1000");
    await token.mint(alice.getAddress(), amount);
    expect(await token.balanceOf(alice.getAddress())).to.eq(amount);
  });

  it("should allow holders to burn their own tokens", async () => {
    const amount = ethers.parseEther("100");
    const base_amount = await token.totalSupply();
    await token.burn(amount);
    expect(await token.totalSupply()).to.eq(base_amount - amount);
  });

  it("should block transfers when paused", async () => {
    const amount = ethers.parseEther("1");
    await token.pause();
    await expect(token.transfer(alice.getAddress(), amount)).to.be.revertedWithCustomError(token, "EnforcedPause");
  });

  it("should resume transfers after unpause", async () => {
    const amount = ethers.parseEther("1");
    await token.pause();
    await token.unpause();
    await token.transfer(alice.getAddress(), amount);
    expect(await token.balanceOf(alice.getAddress())).to.eq(amount);
  });

  it("should only allow owner to pause/unpause", async () => {
    await expect(
      token.connect(alice).pause()
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("should block transfers from blacklisted addresses", async () => {
    const amount = ethers.parseEther("100");
    await token.transfer(alice.getAddress(), amount);
    await token.setBlacklist(alice.getAddress(), true);
    await expect(token.connect(alice).transfer(bob.getAddress(), amount)).to.be.revertedWith("Whale42: sender is blacklisted");
  });

  it("should allow owner to un-blacklist", async () => {
    const amount = ethers.parseEther("100");
    await token.setBlacklist(alice.getAddress(), true);
    await token.setBlacklist(alice.getAddress(), false);
    await token.transfer(alice.getAddress(), amount);
    expect(await token.balanceOf(alice.getAddress())).to.eq(amount);
  });
});
