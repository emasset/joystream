import { membershipTest } from './membershipCreationTest';
import { KeyringPair } from '@polkadot/keyring/types';
import { ApiWrapper } from '../utils/apiWrapper';
import { WsProvider, Keyring } from '@polkadot/api';
import { initConfig } from '../utils/config';
import BN = require('bn.js');
import { registerJoystreamTypes } from '@joystream/types';
import { assert } from 'chai';

describe('Council integration tests', () => {
  initConfig();
  const keyring = new Keyring({ type: 'sr25519' });
  const nodeUrl: string = process.env.NODE_URL!;
  const sudoUri: string = process.env.SUDO_ACCOUNT_URI!;
  const K: number = +process.env.COUNCIL_ELECTION_K!;
  const greaterStake: BN = new BN(+process.env.COUNCIL_STAKE_GREATER_AMOUNT!);
  const lesserStake: BN = new BN(+process.env.COUNCIL_STAKE_LESSER_AMOUNT!);
  const defaultTimeout: number = 120000;
  let sudo: KeyringPair;
  let apiWrapper: ApiWrapper;
  let m1KeyPairs: KeyringPair[] = new Array();
  let m2KeyPairs: KeyringPair[] = new Array();

  before(async function () {
    this.timeout(defaultTimeout);
    registerJoystreamTypes();
    const provider = new WsProvider(nodeUrl);
    apiWrapper = await ApiWrapper.create(provider);
  });

  membershipTest(m1KeyPairs);
  membershipTest(m2KeyPairs);

  it('Electing a council test', async () => {
    sudo = keyring.addFromUri(sudoUri);
    let now = await apiWrapper.getBestBlock();
    await apiWrapper.sudoStartAnnouncingPerion(sudo, now.addn(100));
    const applyForCouncilFee: BN = apiWrapper.estimateApplyForCouncilFee(greaterStake);
    const voteForCouncilFee: BN = apiWrapper.estimateVoteForCouncilFee(sudo.address, sudo.address, greaterStake);
    const revealVoteFee: BN = apiWrapper.estimateRevealVoteFee(sudo.address, sudo.address);
    await apiWrapper.transferBalanceToAccounts(sudo, m2KeyPairs, applyForCouncilFee.add(greaterStake));
    await apiWrapper.transferBalanceToAccounts(sudo, m1KeyPairs, voteForCouncilFee.add(new BN(300)).add(greaterStake));
    await apiWrapper.batchApplyForCouncilElection(m2KeyPairs.slice(0, K), greaterStake);
    m2KeyPairs.forEach(keyPair =>
      apiWrapper.getCouncilElectionStake(keyPair.address).then(stake => {
        assert(
          stake.eq(greaterStake),
          `${keyPair.address} not applied correctrly for council election with stake ${stake} versus expected ${greaterStake}`
        );
      })
    );
    await apiWrapper.batchApplyForCouncilElection(m2KeyPairs.slice(K), lesserStake);
    await apiWrapper.sudoStartVotingPerion(sudo, new BN(1000));
    await apiWrapper.batchVoteForCouncilMember(m1KeyPairs.slice(0, K), m2KeyPairs.slice(0, K), lesserStake);
    await apiWrapper.batchVoteForCouncilMember(m1KeyPairs.slice(K), m2KeyPairs.slice(K), greaterStake);
    await apiWrapper.sudoStartRevealingPerion(sudo, now.addn(100));
    console.log('going to reveal votes');
    //await apiWrapper.batchRevealVote(m1KeyPairs.slice(0, K), m2KeyPairs.slice(0, K));
    //await apiWrapper.batchRevealVote(m1KeyPairs.slice(K), m2KeyPairs.slice(K));
    now = await apiWrapper.getBestBlock();
    console.log('now ' + now);
    await apiWrapper.sudoStartRevealingPerion(sudo, now.addn(2));
  }).timeout(defaultTimeout);

  after(() => {
    apiWrapper.close();
  });
});
