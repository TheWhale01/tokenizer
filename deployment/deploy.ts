import { network } from "hardhat";

async function main() {
	const { ethers, networkName } = await network.create();

	console.log(`Deploying Whale42 to ${networkName}...`);

	const whale42 = await ethers.deployContract("Whale42");

	console.log("Waiting for the deployment tx to confirm");
	await whale42.waitForDeployment();

	console.log(`Whale42 address: ${await whale42.getAddress()}`);
	console.log("Deployment successfull !");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
