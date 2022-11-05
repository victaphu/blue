import '@nomicfoundation/hardhat-chai-matchers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { blueRegistrarFixture } from './utils/fixtures';

describe('Blue Registrar Test', () => {
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
  let BlueRegistrar: any;

  before('Test Blue E2E', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    ({ Blue20, Blue1155, Blue721, BlueAvatar, BlueRegistrar } = await loadFixture(blueRegistrarFixture));
  });

  describe('Test Blue E2E', async () => {
    it('should allow redeem', async () => {

      const msgHash = ethers.utils.solidityKeccak256(["address"], [acc02.address]);
      let signature = await owner.signMessage(ethers.utils.arrayify(msgHash));
      // claiming test
      let txn = await BlueRegistrar.connect(acc02).registerUser(signature);
      expect(txn).to.be.ok;
      await expect(BlueRegistrar.connect(acc02).registerUser(signature)).to.be.revertedWith("user already registered"); // expect third time to fail

      // have user claim twice
      await BlueRegistrar.connect(acc02).claimBlueToken();
      await BlueRegistrar.connect(acc02).claimBlueToken();
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      await BlueRegistrar.setMax(3);
      await BlueRegistrar.connect(acc02).claimBlueToken();
      console.log(await Blue20.balanceOf(acc02.address))
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      // fast forward one day and try again
      await network.provider.send("evm_increaseTime", [86400]);
      await BlueRegistrar.connect(acc02).claimBlueToken()
      await BlueRegistrar.connect(acc02).claimBlueToken()      
      await BlueRegistrar.connect(acc02).claimBlueToken()
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      expect(await Blue20.balanceOf(acc02.address)).is.equal(ethers.BigNumber.from("6"))

      // purchase accessories test
      await Blue20.connect(acc02).approve(Blue1155.address, 100);
      txn = await Blue1155.connect(acc02).buy(1);
      expect(txn).to.be.ok;
      expect(await Blue20.balanceOf(acc02.address)).is.equal(ethers.BigNumber.from("4"))


      // try to equip this
      expect(await Blue1155.balanceOf(acc02.address, 1)).equal(ethers.BigNumber.from("1"));
      await Blue1155.connect(acc02).setApprovalForAll(BlueAvatar.address, true);
      txn = await BlueAvatar.connect(acc02).equip(1, 1)
      expect(txn).to.be.ok;
      expect(await Blue1155.balanceOf(acc02.address, 1)).equal(ethers.BigNumber.from("0"));
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).equal(ethers.BigNumber.from("1"));

      // try to unequip this by wrong user
      await expect(BlueAvatar.connect(acc01).unequip(1, 1)).to.be.revertedWith("Not owner");
      txn = await BlueAvatar.connect(acc02).unequip(1, 1)
      expect(txn).to.be.ok;
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).equal(ethers.BigNumber.from("0"));
      expect(await Blue1155.balanceOf(acc02.address, 1)).equal(ethers.BigNumber.from("1"));
      // buy another item
      txn = await Blue1155.connect(acc02).buy(50);
      expect(txn).to.be.ok;
      
      // buy a third item in the same slot
      txn = await Blue1155.connect(acc02).buy(2);
      expect(txn).to.be.ok;
      
      // try to equip item 1
      console.log(await Blue721.getProps(1));
      txn = await BlueAvatar.connect(acc02).equip(1, 1)
      expect(txn).to.be.ok;
      console.log(await Blue721.getProps(1));

      // equip second item
      txn = await BlueAvatar.connect(acc02).equip(1, 50)
      expect(txn).to.be.ok;
      console.log(await Blue721.getProps(1));

      // expect 1155 token balance to be 2
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).equal(ethers.BigNumber.from("1"));
      expect(await Blue1155.balanceOf(BlueAvatar.address, 50)).equal(ethers.BigNumber.from("1"));

      expect(await Blue1155.balanceOf(acc02.address, 1)).equal(ethers.BigNumber.from("0"));
      expect(await Blue1155.balanceOf(acc02.address, 2)).equal(ethers.BigNumber.from("1"));
      expect(await Blue1155.balanceOf(acc02.address, 50)).equal(ethers.BigNumber.from("0"));

      // equip same slot item, should un-equip previous
      txn = await BlueAvatar.connect(acc02).equip(1, 2)
      expect(txn).to.be.ok;
      expect(await Blue1155.balanceOf(BlueAvatar.address, 1)).equal(ethers.BigNumber.from("0"));
      expect(await Blue1155.balanceOf(BlueAvatar.address, 2)).equal(ethers.BigNumber.from("1"));
      expect(await Blue1155.balanceOf(BlueAvatar.address, 50)).equal(ethers.BigNumber.from("1"));

      expect(await Blue1155.balanceOf(acc02.address, 1)).equal(ethers.BigNumber.from("1"));
      expect(await Blue1155.balanceOf(acc02.address, 2)).equal(ethers.BigNumber.from("0"));
      expect(await Blue1155.balanceOf(acc02.address, 50)).equal(ethers.BigNumber.from("0"));
      
    });
  });
});

