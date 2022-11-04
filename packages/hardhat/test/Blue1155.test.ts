import '@nomicfoundation/hardhat-chai-matchers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { blue1155Fixture } from './utils/fixtures';

describe('ERC1155Basic', () => {
  type WalletWithAddress = SignerWithAddress;

  // contract deployer/admin
  let owner: WalletWithAddress;
  // extra EOAs
  let acc01: WalletWithAddress;
  let acc02: WalletWithAddress;

  let Blue1155: any;
  let Blue20: any;

  before('Set signers and reset network', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    await network.provider.send('hardhat_reset');

    ({ Blue1155, Blue20 } = await loadFixture(blue1155Fixture));
  });

  describe('Test Minting', async () => {
    it('should generate mint to create nft', async () => {
      await expect(Blue1155.buy(1)).to.be.revertedWith("token does not exist");
      await Blue1155.mint(1, 1);
      await expect(Blue1155.buy(1)).to.be.revertedWith("ERC20: insufficient allowance");

      await Blue20.approve(Blue1155.address, 100);

      await expect(Blue1155.buy(1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);
      await Blue20.mint(owner.address);


      expect((await Blue20.balanceOf(acc02.address)).toString()).equal("0");
      expect((await Blue20.balanceOf(owner.address)).toString()).equal("10");
      const tx = await Blue1155.buy(1);

      expect(tx).to.be.ok;
      await expect(tx).to.emit(Blue1155, "AccessoryPurchased").withArgs(1, [1, 1], owner.address);

      expect((await Blue20.balanceOf(acc01.address)).toString()).equal("2");
      expect((await Blue20.balanceOf(owner.address)).toString()).equal("8");

      await Blue1155.mintBatch(1, [2,3,4,5,6,7,8,9,10], 9);

      await expect(Blue1155.buy(1)); // can rebuy another one
      await expect(Blue1155.buy(11)).to.be.revertedWith("token does not exist");


      await expect(Blue1155.buy(2)); 
      await expect(Blue1155.buy(3)); 
      await expect(Blue1155.buy(4)); 
      await expect(Blue1155.buy(5)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      
    });
  });
});
