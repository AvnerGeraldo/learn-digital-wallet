import User, { UserParams, UserBankAccount } from "@src/types/user";
import bankPartner from '@src/ports/bank-partner'

export default async (userParams: UserParams): Promise<UserBankAccount> => {
  const user: User = {
    id: '',
    fullname: userParams.fullname
  }

  await bankPartner.createAccount(user)

  return {
    id: '',
    userId: user.id,
    bankCode: '',
    accountBranch: '',
    accountNumber: ''
  }
}
