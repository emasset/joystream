import { BareProps, ApiProps } from '@polkadot/ui-api/types';
import { QueueTx$ExtrinsicAdd, TxCallbacks } from '@polkadot/ui-app/Status/types';

import React from 'react';
import { Button } from '@polkadot/ui-app/index';
import { QueueConsumer } from '@polkadot/ui-app/Status/Context';
import { withApi } from '@polkadot/ui-api/index';
import { assert } from '@polkadot/util';
import { withMyAccount, MyAccountProps } from '@polkadot/joy-utils/MyAccount';

type InjectedProps = {
  queueExtrinsic: QueueTx$ExtrinsicAdd;
};

type Props = BareProps & ApiProps & MyAccountProps & TxCallbacks & {
  accountId?: string,
  isPrimary?: boolean,
  isDisabled?: boolean,
  label: React.ReactNode,
  params: Array<any>,
  tx: string
};

class TxButtonInner extends React.PureComponent<Props & InjectedProps> {
  render () {
    const { myAddress, accountId, isPrimary = true, isDisabled, label } = this.props;
    const origin = accountId || myAddress;

    return (
      <Button
        {...this.props}
        isDisabled={isDisabled || !origin}
        isPrimary={isPrimary}
        label={label}
        onClick={() => {
          this.send();
        }}
      />
    );
  }

  private send = (): void => {
    const {
      myAddress, accountId, api, params, queueExtrinsic, tx,
      onTxCancelled, onTxSent, onExtrinsicFailed, onExtrinsicSuccess
    } = this.props;
    const origin = accountId || myAddress;
    const [section, method] = tx.split('.');

    assert(api.tx[section] && api.tx[section][method], `Unable to find api.tx.${section}.${method}`);

    queueExtrinsic({
      accountId: origin,
      extrinsic: api.tx[section][method](...params) as any, // ???
      onTxCancelled,
      onTxSent,
      onExtrinsicFailed,
      onExtrinsicSuccess
    });
  }
}

class TxButton extends React.PureComponent<Props> {
  render () {
    return (
      <QueueConsumer>
        {({ queueExtrinsic }) => (
          <TxButtonInner
            {...this.props}
            queueExtrinsic={queueExtrinsic}
          />
        )}
      </QueueConsumer>
    );
  }
}

export default withApi(withMyAccount(TxButton));
