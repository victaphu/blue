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

  before('Test Blue Registrar', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    ({ Blue20, Blue1155, Blue721, BlueAvatar, BlueRegistrar } = await loadFixture(blueRegistrarFixture));
  });

  describe('Test Blue Registrar', async () => {
    it('should allow redeem', async () => {
      let txn = await BlueRegistrar.registerUser(acc02.address);
      expect(txn).to.be.ok;
      await expect(BlueRegistrar.registerUser(acc02.address)).to.be.revertedWith("user already registered"); // expect third time to fail


      // have user claim twice
      await BlueRegistrar.connect(acc02).claimBlueToken();
      await BlueRegistrar.connect(acc02).claimBlueToken();
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      await BlueRegistrar.setMax(3);
      await BlueRegistrar.connect(acc02).claimBlueToken();
      console.log(await Blue20.balanceOf(acc02.address))
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      // test another user claiming works      
      await expect(BlueRegistrar.connect(acc01).claimBlueToken()).to.be.revertedWith("user not registered");
      txn = await BlueRegistrar.registerUser(acc01.address);
      expect(txn).to.be.ok;

      txn = await BlueRegistrar.connect(acc01).claimBlueToken()
      expect(txn).to.be.ok;
      await BlueRegistrar.connect(acc01).claimBlueToken()
      await BlueRegistrar.connect(acc01).claimBlueToken()
      await expect(BlueRegistrar.connect(acc01).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      // fast forward one day and try again
      await network.provider.send("evm_increaseTime", [86400]);
      await BlueRegistrar.connect(acc01).claimBlueToken()
      await BlueRegistrar.connect(acc01).claimBlueToken()

      await BlueRegistrar.connect(acc02).claimBlueToken()
      await BlueRegistrar.connect(acc02).claimBlueToken()      
      await BlueRegistrar.connect(acc02).claimBlueToken()
      await expect(BlueRegistrar.connect(acc02).claimBlueToken()).to.be.revertedWith("already claimed max today"); // expect third time to fail

      expect(await Blue20.balanceOf(acc01.address)).is.equal(ethers.BigNumber.from("5"))
      expect(await Blue20.balanceOf(acc02.address)).is.equal(ethers.BigNumber.from("6"))

    });
  });
});
