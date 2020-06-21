import { expect } from 'chai'
import { SinonStub, restore, stub } from 'sinon';
import bankPartner from '@src/ports/bank-partner'
import createBankAccount from '@src/controllers/create-bank-account'
import { UserParams } from '@src/types/user';

let createAccountBankPartner: SinonStub

describe('Create bank account', () => {
  beforeEach(() => {
    createAccountBankPartner = stub(bankPartner, 'createAccount')
  })

  afterEach(() => restore())

  it('should call a bank partner to create a bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Some fullname'
    }

    await createBankAccount(userParams)

    expect(createAccountBankPartner).to.have.been.calledOnce
  });
});
