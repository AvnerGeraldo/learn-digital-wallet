import Signup from '@src/types/signup'

const insert = async (signup: Signup): Promise<void> => {
  throw new Error('Not implemented')
}

const updateStatus = async (signup: Signup, newStatus: string): Promise<Signup> => {
  throw new Error('Not implemented')
}

const getByToken = async (token: string): Promise<Signup> => {
  throw new Error('Not implemented')
}

export default {
  insert,
  updateStatus,
  getByToken
}
