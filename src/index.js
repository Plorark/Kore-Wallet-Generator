import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import { Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';
import 'milligram'
// import { BrowserRouter, Route } from 'react-router-dom';

const title = "Kore Wallet Generator";
const description = "A simple mnemonic Kore wallet generator";
// const cover = "";

ReactDOM.render(
   <div>
      <Metas title={title} description={description} />
      <Favicon />
      <App />
   </div>
   , document.getElementById('root')
);
