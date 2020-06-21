import { expect } from 'chai'
import { SinonStub, restore, stub } from 'sinon';
import bankPartner from '@src/ports/bank-partner'
import userRepo from '@src/ports/repo/user.ts'
import userBankAccountRepo from '@src/ports/repo/user-bank-account.ts'
import createBankAccount from '@src/controllers/create-bank-account'
import User, { UserParams, UserBankAccount } from '@src/types/user';
import BankAccount from '@src/types/bank-account';

let createAccountBankPartner: SinonStub,
insertUser: SinonStub,
insertUserBankAccount: SinonStub

const makeGivenBankAccount = (): BankAccount => ({
  bankCode: '123',
  accountBranch: '0001',
  accountNumber: '1234567'
})

describe('Create bank account', () => {
  beforeEach(() => {
    createAccountBankPartner = stub(bankPartner, 'createAccount').resolves(makeGivenBankAccount())
    insertUser = stub(userRepo, 'insert')
    insertUserBankAccount = stub(userBankAccountRepo, 'insert')
  })

  afterEach(() => restore())

  it('should call a bank partner to create a bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Some fullname'
    }

    await createBankAccount(userParams)

    expect(createAccountBankPartner).to.have.been.calledOnce
  });

  it('should persist user in the database', async () => {
    const userParams: UserParams = {
      fullname: 'Some fullname'
    }

    await createBankAccount(userParams)

    expect(insertUser).to.have.been.calledOnce

    const insertedUser = insertUser.getCall(0).args[0] as User
    expect(insertedUser.id).to.be.a('string').that.has.length(36)
    expect(insertedUser.fullname).to.be.equal(userParams.fullname)
  });

  it('should persist user bank account in the database', async () => {
    const userParams: UserParams = {
      fullname: 'Some fullname'
    }

    await createBankAccount(userParams)

    expect(insertUserBankAccount).to.have.been.calledOnce

    const insertedUserBankAccount = insertUserBankAccount.getCall(0).args[0] as UserBankAccount
    expect(insertedUserBankAccount.id).to.be.a('string').that.has.length(36)
    expect(insertedUserBankAccount.bankCode).to.be.equal('123')
    expect(insertedUserBankAccount.accountBranch).to.be.equal('0001')
    expect(insertedUserBankAccount.accountNumber).to.be.equal('1234567')
  });

  it('should return an user bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Some fullname'
    }

    const userBankAccount = await createBankAccount(userParams)

    expect(userBankAccount.id).to.be.a('string').that.has.length(36)
    expect(userBankAccount.bankCode).to.be.equal('123')
    expect(userBankAccount.accountBranch).to.be.equal('0001')
    expect(userBankAccount.accountNumber).to.be.equal('1234567')
  });
});
