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
    });
});
