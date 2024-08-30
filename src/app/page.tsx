'use client';
import { Base } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import OnchainProviders from '@/components/OnchainProviders';
import ViewPixel from '@/components/ViewPixel';
import { Upp } from '@/components/Upp';
import WalletComponents from '@/components/WalletComponents';
import logow from './logow.png';
import base from './base.png';
import sweep from './sweep.png';
import './css.css';

export default function Page() {
  return (
    <div style={{marginLeft:'2vw', color: '#FFF', height:'fit-content'}}>
      <div className='dynamicPage'>
        <img src={sweep.src} alt="Description of the image" style={{ width: '80%', maxWidth: '500px' }} />
        <h2 style={{ fontFamily: 'onchain', fontSize: '1.2vh', color: '#FFF'}}>coLOR PiXELs To EaRN</h2>
        <img src={base.src} alt="Description of the image" className='base' style={{padding: '5%', width: '80%', maxWidth: '150px' }} />
      </div>
      <ThirdwebProvider activeChain={Base} clientId="" supportedWallets={[
        coinbaseWallet(),
        metamaskWallet(),
        walletConnect()
      ]}>
  
  <OnchainProviders>
          <div className='components'>
            <div className='connect'>
              <WalletComponents />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
                <ViewPixel />
                <div style={{ position: 'absolute', bottom: '0%', right: '0%' }}>
                  <Upp />
                </div>
              </div>
            </div>
          </div>
        </OnchainProviders>
      </ThirdwebProvider>

    
    </div>
  );
}

