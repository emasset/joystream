// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { Option } from './types';

export default function createHeader (option: KeyringSectionOption): Option {
  return {
    ...option,
    className: 'header disabled',
    text: option.name
  };
}
