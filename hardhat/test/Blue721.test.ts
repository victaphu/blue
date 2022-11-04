import '@nomicfoundation/hardhat-chai-matchers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { blue721Fixture } from './utils/fixtures';

describe('ERC721Basic', () => {
  type WalletWithAddress = SignerWithAddress;

  // contract deployer/admin
  let owner: WalletWithAddress;
  // extra EOAs
  let acc01: WalletWithAddress;
  let acc02: WalletWithAddress;

  let Blue721: any;

  before('Set signers and reset network', async () => {
    console.log("Lioading");
    [owner, acc01, acc02] = await ethers.getSigners();

    await network.provider.send('hardhat_reset');

    ({ Blue721 } = await loadFixture(blue721Fixture));
  });

  describe('Test Minting', async () => {
    it('should generate mint to create nft', async () => {
      const res = await Blue721.generateFeatures();
      console.log(res.toString(), res.toString().length);

      // let x = 0;

      // for (let i = 0; i < 8; ++i) {
      //   let v = (await Blue721.createRandom(24, i)).toNumber();
      //   console.log('rand', v);
      //   x = x * 100 + v;
      // }

      // console.log(x)

      console.log(await Blue721.generateTones())


      const r = await Blue721.mint(acc02.address)
      const txn = await r.wait();
      console.log(txn.events[1].args);
      (await Blue721.update(1, 1, 21));
      (await Blue721.update(1, 2, 7));
      (await Blue721.update(1, 3, 4));
      (await Blue721.update(1, 4, 29));
      (await Blue721.update(1, 5, 20));
      (await Blue721.update(1, 6, 17));
      (await Blue721.update(1, 7, 6));
      (await Blue721.update(1, 8, 8));
      (await Blue721.update(1, 9, 6));
      (await Blue721.update(1, 10, 18));
      (await Blue721.update(1, 11, 33));
      (await Blue721.update(1, 12, 7));
      (await Blue721.update(1, 13, 7));
      (await Blue721.update(1, 14, 9));
      console.log(await Blue721.getProps(1));

      (await Blue721.update(1, 1, 1));
      (await Blue721.update(1, 2, 1));
      (await Blue721.update(1, 3, 1));
      (await Blue721.update(1, 4, 1));
      (await Blue721.update(1, 5, 1));
      (await Blue721.update(1, 6, 1));
      (await Blue721.update(1, 7, 1));
      (await Blue721.update(1, 8, 1));
      (await Blue721.update(1, 9, 1));
      (await Blue721.update(1, 10, 1));
      (await Blue721.update(1, 11, 1));
      (await Blue721.update(1, 12, 1));
      (await Blue721.update(1, 13, 1));
      (await Blue721.update(1, 14, 1));

      console.log(await Blue721.getProps(1));

    });

    it('should allow combinations of equipped items', async () => {
      const res = await Blue721.generateFeatures();
      console.log(res.toString(), res.toString().length);

      // let x = 0;

      // for (let i = 0; i < 8; ++i) {
      //   let v = (await Blue721.createRandom(24, i)).toNumber();
      //   console.log('rand', v);
      //   x = x * 100 + v;
      // }

      // console.log(x)

      console.log(await Blue721.generateTones())


      const r = await Blue721.mint(acc02.address)
      const txn = await r.wait();
      // zero all then equip
      console.log(txn.events[1].args);
      (await Blue721.update(1, 1, 0));
      (await Blue721.update(1, 2, 0));
      (await Blue721.update(1, 3, 0));
      (await Blue721.update(1, 4, 0));
      (await Blue721.update(1, 5, 0));
      (await Blue721.update(1, 6, 0));
      (await Blue721.update(1, 7, 0));
      (await Blue721.update(1, 8, 0));
      (await Blue721.update(1, 9, 0));
      (await Blue721.update(1, 10, 0));
      (await Blue721.update(1, 11, 0));
      (await Blue721.update(1, 12, 0));
      (await Blue721.update(1, 13, 0));
      (await Blue721.update(1, 14, 0));
      console.log(await Blue721.getProps(1));

      expect((await Blue721.getProps(1)).stats).equal(ethers.BigNumber.from("0"));

      (await Blue721.update(1, 1, 1));
      (await Blue721.update(1, 2, 1));
      (await Blue721.update(1, 3, 1));
      (await Blue721.update(1, 4, 1));
      (await Blue721.update(1, 5, 1));
      (await Blue721.update(1, 6, 1));
      (await Blue721.update(1, 7, 1));
      (await Blue721.update(1, 8, 1));
      (await Blue721.update(1, 9, 1));
      (await Blue721.update(1, 10, 1));
      (await Blue721.update(1, 11, 1));
      (await Blue721.update(1, 12, 1));
      (await Blue721.update(1, 13, 1));
      (await Blue721.update(1, 14, 1));

      let rx = (await Blue721.getProps(1)).stats.toString();
      

      expect(rx).equal("101010101010101010101010101");

      (await Blue721.update(1, 1, 0));
      (await Blue721.update(1, 2, 0));
      (await Blue721.update(1, 3, 0));
      (await Blue721.update(1, 4, 0));
      (await Blue721.update(1, 5, 0));
      (await Blue721.update(1, 6, 0));
      (await Blue721.update(1, 7, 0));
      (await Blue721.update(1, 8, 0));
      (await Blue721.update(1, 9, 0));
      (await Blue721.update(1, 10, 0));
      (await Blue721.update(1, 11, 0));
      (await Blue721.update(1, 12, 0));
      (await Blue721.update(1, 13, 0));
      (await Blue721.update(1, 14, 0));
      
      // // we will now randomly update the values at the end it should be same

      (await Blue721.update(1, 14, 1));
      (await Blue721.update(1, 1, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 11, 1));
      (await Blue721.update(1, 2, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 3, 1));
      (await Blue721.update(1, 13, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 5, 1));
      (await Blue721.update(1, 12, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 6, 1));
      (await Blue721.update(1, 7, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 10, 1));
      (await Blue721.update(1, 8, 1));
      console.log((await Blue721.getProps(1)).stats);
      (await Blue721.update(1, 4, 1));
      (await Blue721.update(1, 9, 1));
      console.log((await Blue721.getProps(1)).stats);
      // console.log(await Blue721.getProps(1));

      expect((await Blue721.getProps(1)).stats.toString()).equal("101010101010101010101010101")

    });
  });
});
