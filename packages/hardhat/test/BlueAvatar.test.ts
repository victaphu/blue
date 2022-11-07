import '@nomicfoundation/hardhat-chai-matchers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { blue20Fixture, blue721Fixture, blueAvatarFixture } from './utils/fixtures';

describe('AvatarTest', () => {
  type WalletWithAddress = SignerWithAddress;

  // contract deployer/admin
  let owner: WalletWithAddress;
  // extra EOAs
  let acc01: WalletWithAddress;
  let acc02: WalletWithAddress;

  let Blue20: any;
  let Blue1155: any;
  let Blue721: any;
  let BlueAvatar: any;

  before('Set signers and reset network', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    ({ Blue20, Blue1155, Blue721, BlueAvatar } = await loadFixture(blueAvatarFixture));
  });

  describe('Test Minting', async () => {
    it('should allow managing avatar', async () => {
      const txn = await BlueAvatar.mint(acc02.address);
      expect(txn).to.be.ok;
      // need to purchase some tokens
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)
      await Blue20.mint(acc02.address)

      // need to approve
      await Blue20.connect(acc02).approve(Blue1155.address, 100);

      await Blue1155.connect(acc02).buy(1);
      await Blue1155.connect(acc02).setApprovalForAll(BlueAvatar.address, true);

      await expect(BlueAvatar.connect(acc02).equip(1, 2)).to.be.revertedWith("Does not own Accessory");

      await BlueAvatar.connect(acc02).equip(1, 1); // equip token 1
      expect(await Blue1155.balanceOf(acc02.address, 1)).to.equal(ethers.BigNumber.from("0")); // make sure token 1 now empty
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).to.equal(ethers.BigNumber.from("1")); // make sure avatar now has 1 token
      expect(await Blue721.balanceOf(acc02.address)).to.equal(ethers.BigNumber.from("1")); // make sure acc02 owns a token

      // lets unequip now!
      await BlueAvatar.connect(acc02).unequip(1, 1); // equip token 1

      // balance should change as well

      expect(await Blue1155.balanceOf(acc02.address, 1)).to.equal(ethers.BigNumber.from("1")); // make sure token 1 now empty
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).to.equal(ethers.BigNumber.from("0")); // make sure avatar now has 1 token
      

      //// test equip / unequip / equip
      await Blue1155.connect(acc02).buy(200); 
      await BlueAvatar.connect(acc02).equip(1, 200); // equip token 1


    });
  });
});
