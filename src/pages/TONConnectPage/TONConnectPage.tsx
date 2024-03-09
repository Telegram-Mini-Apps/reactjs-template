import { FC, ReactNode } from 'react';
import { useTonWallet, TonConnectButton } from '@tonconnect/ui-react';

import { Page } from '../../components/Page';

import './TONConnectPage.css';
import { DataTable } from '../../components/DataTable';
import { Link } from '../../components/Link';
import { useUtils } from '@tma.js/sdk-react';

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const utils = useUtils();
  let content: ReactNode;

  if (wallet) {
    console.log(wallet);
    const {
      chain,
      publicKey,
      address,
    } = wallet.account;
    content = (
      <>
        {'imageUrl' in wallet && (
          <div className="ton-connect-page__provider">
            <img
              className="ton-connect-page__provider-image"
              alt="Provide image"
              src={wallet.imageUrl}
              width={60}
              height={60}
            />
            <div className="ton-connect-page__provider-meta">
              <p className="ton-connect-page__provider-wallet-name">
                {wallet.name}&nbsp;
                <span className="ton-connect-page__provider-app-name">
                  ({wallet.appName})
                </span>
              </p>
              <Link
                to={wallet.aboutUrl}
                onClick={(e) => {
                  e.preventDefault();
                  utils.openLink(wallet.aboutUrl);
                }}
              >
                About connected wallet
              </Link>
            </div>
          </div>
        )}
        <DataTable
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
          ]}
        />
      </>
    );
  } else {
    content = (
      <p>
        To display the data related to the TON Connect, it is required to connect your wallet.
      </p>
    );
  }

  return (
    <Page title="TON Connect">
      {content}
      <div className="ton-connect-page__button-container">
        <TonConnectButton/>
      </div>
    </Page>
  );
};