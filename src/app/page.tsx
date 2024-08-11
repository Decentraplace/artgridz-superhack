'use client';
import { Base } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import OnchainProviders from '@/components/OnchainProviders';
import ViewPixels from '@/components/ViewPixels';
import ViewPixel from '@/components/ViewPixel';
import { Upp } from '@/components/Upp';
import WalletComponents from '@/components/WalletComponents';
import logow from './logow.png';
import './css.css';

export default function Page() {
  return (
    <div>
         <div style={{display:"flex", flexDirection:"row", marginBottom:'5.5vh', alignItems:'flex-end'}}>
         <img src={logow.src} alt="Description of the image" width={"100vw"} />
        <h2 style={{fontFamily:'Pixel', fontSize:'4vh', marginBottom:'1.2vh', marginLeft:'0.2vw'}}>rtGridz</h2>
       </div>
    <div className="flex flex-row" style={{backgroundColor: "#67e4a4", marginTop:'-4vh'}}>
      <ThirdwebProvider activeChain={Base} clientId="">
    <section className="flex flex-col w-full  mb-8 border-b border-indigo-600 pb-4">
      <div className="flex items-center mb-4">
      </div>
    </section>
  
    <OnchainProviders>
    <section className="flex flex-col w-full mb-8 border-b border-indigo-600 pb-4">
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800" style={{marginTop:'1vh',marginBottom:'1vh', maxWidth:'23vw'}}>
        <WalletComponents />
      </div>
      <div style={{zIndex:'3'}}>
        <Upp/>
      </div>
      <div style={{position:"absolute", pointerEvents:'none', opacity:'0.5', top:'14.1vh', left:'37.36vw', zIndex:'1'}}>
          <ViewPixel />
        </div>
    </section>
    </OnchainProviders>
  
    
      <section className="flex flex-col w-full mb-8 border-b border-indigo-600 pb-4">
        <div className="flex flex-col mb-4">
          <ViewPixels />
        </div>
        <main className="flex flex-col space-y-6">
        </main>
      </section>
    </ThirdwebProvider>
  </div>
  </div>
  );
}