import '@nomicfoundation/hardhat-chai-matchers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { blue20Fixture, blue721Fixture } from './utils/fixtures';

describe('ERC20Test', () => {
  type WalletWithAddress = SignerWithAddress;

  // contract deployer/admin
  let owner: WalletWithAddress;
  // extra EOAs
  let acc01: WalletWithAddress;
  let acc02: WalletWithAddress;

  let Blue20: any;

  before('Set signers and reset network', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    await network.provider.send('hardhat_reset');

    ({ Blue20 } = await loadFixture(blue20Fixture));
  });

  describe('Test Minting', async () => {
    it('should generate mint to create nft', async () => {
      await expect(Blue20.connect(acc02).mint(acc02.address)).to.be.revertedWith('Ownable: caller is not the owner');

      const tx = await Blue20.mint(acc02.address);

      expect(tx).to.be.ok;
      expect((await Blue20.balanceOf(acc02.address)).toString()).equals("1");
    });
  });
});
