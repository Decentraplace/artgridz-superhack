import { ConnectAccount } from '@coinbase/onchainkit/wallet';

export default function WalletComponents() {
  return (
    <main className="flex h-8 items-center space-x-4" >
      <ConnectAccount />
    </main>
  );
}
