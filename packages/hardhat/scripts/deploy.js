// deploy blue20
// deploy blue 721
// deploy blue 1155
// deploy blue avatar
// deploy blue registrar

// grant 1155 and 721 to blue avatar
// grant 20 to blue registrar
// grant avatar to blue registrar

const hre = require("hardhat");



async function blue721Fixture() {
  const factory = await hre.ethers.getContractFactory(
    "Blue721",
  );
  const Blue721 = await factory.deploy();
  
  return { Blue721 };
}

async function blue20Fixture() {
  const factory = await hre.ethers.getContractFactory(
    "Blue20",
  );
  const Blue20 = await factory.deploy();
  
  return { Blue20 };
}


async function blue1155Fixture() {
  const factory = await hre.ethers.getContractFactory(
    "Blue1155",
  );
  const [owner] = await ethers.getSigners();

  const {Blue20} = await blue20Fixture();

  // note: in the future we will be sending the tokens to either a DAO
  // or some form of splitter to re-share the tokens back to the users
  // now we are just gonna be greedy and send to my own accounts =]
  const Blue1155 = await factory.deploy(Blue20.address, owner.address);
  
  return { Blue1155, Blue20 };
}

async function blueAvatarFixture() {
  const factory = await hre.ethers.getContractFactory(
    "BlueAvatar",
  );
  const {Blue20, Blue1155} = await blue1155Fixture();
  const {Blue721} = await blue721Fixture();
  const ids = [7, 21, 4, 29, 20, 17, 6, 8, 6, 18, 33, 7, 7, 9];
  for (let i = 0; i < ids.length; ++i) {
    await Blue1155.mintBatch(i + 1, Array.from({length: ids[i]}, (_, i) => i + 1), ids[i])
    console.log(i + 1, ids[i])
  }

  const BlueAvatar = await factory.deploy(Blue721.address, Blue1155.address);

  await Blue1155.transferOwnership(BlueAvatar.address);
  await Blue721.transferOwnership(BlueAvatar.address);
  
  return {Blue20, Blue1155, Blue721, BlueAvatar};
}

async function blueRegistrarFixture() {
  const {Blue20, Blue1155, Blue721, BlueAvatar} = await blueAvatarFixture();

  const factory = await hre.ethers.getContractFactory("BlueRegistrar");
  const BlueRegistrar = await factory.deploy(Blue1155.address, Blue721.address, Blue20.address, BlueAvatar.address);
  await Blue20.transferOwnership(BlueRegistrar.address);
  await BlueAvatar.transferOwnership(BlueRegistrar.address); // transfer ownership
  console.log("Deployment Completed")
  console.log(`  Blue20: ${Blue20.address}`)
  console.log(`  Blue1155: ${Blue1155.address}`)
  console.log(`  Blue721: ${Blue721.address}`)
  console.log(`  BlueAvatar: ${BlueAvatar.address}`)
  console.log(`  BlueRegistrar: ${BlueRegistrar.address}`)
  return {Blue20, Blue1155, Blue721, BlueAvatar, BlueRegistrar};
}

async function blueRegistrarPatch() {
  const BlueAvatar = await hre.ethers.getContractAt("BlueAvatar", "0x91e1A82c02348f04ed3B2F5cA7938D0d5fE186eC");
  const BlueRegistrar = await hre.ethers.getContractAt("BlueRegistrar", "0xEc1cbF8c21eCdB964d6a784E94f40BcE493E350A");
  console.log(BlueAvatar)
  await BlueAvatar.transferOwnership(BlueRegistrar.address);
}

async function main() {
  await blueRegistrarFixture();

  // await blueRegistrarPatch();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// Blue20: 0x06c772643b05b95667C6D99118eC4753F832F2CD
// Blue1155: 0x874345ef14eE69c8E00aB797AC912046ca2c3A47
// Blue721: 0xCf77266ACE6189E6beFbd576B219642B860c5eB1
// BlueAvatar: 0x1e281625469C45f0173F2B67FEF8Dd3d33f442F1
// BlueRegistrar: 0x8da40C67019605Ae94f1d8e105A1CbDc43672245