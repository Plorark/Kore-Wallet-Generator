import React from 'react';
import Mnemonic from 'bitcore-mnemonic-kore';
import bitcorelib from 'bitcore-lib-kore';
import style from './styles.scss';

export default class Generator extends React.Component {
   static walletGenerator() {
      const wallet = {};
      const privateWords = new Mnemonic(Mnemonic.Words.ENGLISH);
      const words = privateWords.toString();
      const HDPrivate = bitcorelib.HDPrivateKey(privateWords.toHDPrivateKey());
      const HDPublic = HDPrivate.hdPublicKey;
      const adress = bitcorelib.Address(HDPublic.publicKey);
      wallet.words = words;
      wallet.hdprivateKey = HDPrivate.toString();
      wallet.hdpublicKey = HDPublic.toString();
      wallet.privateKey = HDPrivate.privateKey.toString();
      wallet.publicKey = HDPublic.publicKey.toString();
      wallet.address = adress.toString();
      return wallet;
   }
   constructor(props) {
      super(props);
      this.state = {
         wallet: {
            words: 'Loading...',
            privateKey: 'Loading...',
            publicKey: 'Loading...',
            address: 'Loading...',
         }
      };
      this.generateWallet = this.generateWallet.bind(this)
   }

   componentDidMount() {
      this.generateWallet();
   }

   generateWallet() {
      const wallet = Generator.walletGenerator();
      this.setState({ wallet });
   }

   render() {
      const { wallet } = this.state;
      return (
         <div className="generator">
            <p><span className="bold">Words:</span> {wallet.words}</p>
            <p><span className="bold">PrivateKey:</span> {wallet.privateKey}</p>
            <p><span className="bold">PublicKey:</span> {wallet.publicKey}</p>
            <p><span className="bold">Address:</span> {wallet.address}</p>
            <button className="coolBtn" onClick={this.generateWallet}>Generate another one</button>
         </div>
      );
   }
}
