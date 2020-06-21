import Signup, { SignupStatus } from '@src/types/signup'

const insert = async (_signup: Signup): Promise<void> => {
  throw new Error('Not implemented')
}

const updateStatus = async (_signup: Signup, _newStatus: SignupStatus): Promise<Signup> => {
  throw new Error('Not implemented')
}

const getByToken = async (_token: string): Promise<Signup> => {
  throw new Error('Not implemented')
}

export default {
  insert,
  updateStatus,
  getByToken
}
