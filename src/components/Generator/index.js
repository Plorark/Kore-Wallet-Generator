import React from 'react';
import Mnemonic from 'bitcore-mnemonic-kore';
import bitcorelib from 'bitcore-lib-kore';
import logo from './images/logo.png'
import style from './styles.scss';

export default class Generator extends React.Component {
   static walletGenerator(initialWords = Mnemonic.Words.ENGLISH) {

      const privateWords = new Mnemonic(initialWords);

      const words = privateWords.toString();
      const HDPrivate = bitcorelib.HDPrivateKey(privateWords.toHDPrivateKey());
      const HDPublic = HDPrivate.hdPublicKey;
      const privateKey = HDPrivate.privateKey;
      const publicKey = HDPublic.publicKey;
      const wif = privateKey.toWIF();
      const address = bitcorelib.Address(HDPublic.publicKey);

      const wallet = {};
      wallet.words = words;
      wallet.hdprivateKey = HDPrivate.toString();
      wallet.hdpublicKey = HDPublic.toString();
      wallet.privateKey = privateKey.toString();
      wallet.publicKey = publicKey.toString();
      wallet.wif = wif;
      wallet.address = address.toString();

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
            wif: 'Loading...',
         }
      };
      this.generateWallet = this.generateWallet.bind(this)
      this.handleBtnClick = this.handleBtnClick.bind(this)
      this.handleInput = this.handleInput.bind(this)
   }

   componentDidMount() {
      this.generateWallet();
   }

   generateWallet(initialWordsArg) {
      const wallet = Generator.walletGenerator(initialWordsArg);
      this.setState({ wallet });
   }

   handleBtnClick() {
      this.generateWallet();
   }

   handleInput(e) {
      const that = this;
      const value = e.target.value;
      const wallet = this.state.wallet;
      wallet.words = value;
      this.setState({ wallet }, () => {
         if (!Mnemonic.isValid(value)) {
            wallet.privateKey = wallet.publicKey = wallet.address = 'Invalid words'
            this.setState({ wallet });
         } else {
            that.generateWallet(value)
         }
      })
   }

   render() {
      const { wallet } = this.state;
      return (
         <div className="generator">
            <img src={logo} height="80" alt="Kore" />
            <h3>Kore Wallet Generator <span className="beta">BETA</span></h3>
            <p><span className="bold">Words</span></p>
            <input onChange={this.handleInput} type="text" value={wallet.words} placeholder="CJ Patoilo" id="nameField" />
            <p className="bold">PrivateKey</p><p className="key">{wallet.privateKey}</p> <div className="divider"></div>
            <p className="bold">PublicKey</p><p className="key">{wallet.publicKey}</p> <div className="divider"></div>
            <p className="bold">Address</p><p className="key">{wallet.address}</p> <div className="divider"></div>
            <p className="bold">WIF</p><p className="key">{wallet.wif}</p>
            <a className="coolBtn" onClick={this.handleBtnClick}>Generate another one</a>
            <div className="divider"></div>
            <div className="divider"></div>
            <div className="disclaimer">
               <p className="bold">DISCLAIMER</p>
               <p>This generator is in beta and it'll probably crash if you start to edit the words field like a mad person.</p>
               <p>Also, please don't try to generate your own private key with 12 words that comes from whatever you think it's random enough. It's not.</p>
               <p>Either click the button or recover an old private key by pasting the seed in here.</p>
               <p>We're no responsible for anything. If you lose your coins or whatever, we'll be very sad and only that.</p>
            </div>
         </div>
      );
   }
}
