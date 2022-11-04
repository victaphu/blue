import { ethers } from "hardhat";

export async function blue721Fixture(): Promise<any> {
  const factory = await ethers.getContractFactory(
    "Blue721",
  );
  const Blue721 = await factory.deploy();
  
  return { Blue721 };
}

export async function blue20Fixture(): Promise<any> {
  const factory = await ethers.getContractFactory(
    "Blue20",
  );
  const Blue20 = await factory.deploy();
  
  return { Blue20 };
}


export async function blue1155Fixture(): Promise<any> {
  const factory = await ethers.getContractFactory(
    "Blue1155",
  );
  const [owner, acc01, acc02] = await ethers.getSigners();

  const {Blue20} = await blue20Fixture();
  const Blue1155 = await factory.deploy(Blue20.address, acc01.address);
  
  return { Blue1155, Blue20 };
}

export async function blueAvatarFixture(): Promise<any> {
  const factory = await ethers.getContractFactory(
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

export async function blueRegistrarFixture(): Promise<any> {
  const {Blue20, Blue1155, Blue721, BlueAvatar} = await blueAvatarFixture();

  const factory = await ethers.getContractFactory("BlueRegistrar");
  const BlueRegistrar = await factory.deploy(Blue1155.address, Blue721.address, Blue20.address, BlueAvatar.address);
  await Blue20.transferOwnership(BlueRegistrar.address);
  await BlueAvatar.transferOwnership(BlueRegistrar.address); // transfer ownership
  return {Blue20, Blue1155, Blue721, BlueAvatar, BlueRegistrar};

}