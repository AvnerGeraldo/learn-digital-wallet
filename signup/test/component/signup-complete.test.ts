import { expect } from 'chai'
import signupComplete from '@src/controllers/signup-complete'
import { SinonStub, stub, restore } from 'sinon';
import signupRepo from '@src/ports/repos/signup'
import Signup from '@src/types/signup';

let getByTokenSignup: SinonStub, updateStatusSignup: SinonStub

const signup: Signup = {
  token: 'some-token',
  initParams: {
    fullname: 'somebody',
    dateOfBirth: '1999-01-01',
    address: 'Some place, 123'
  },
  status: 'IN_PROGRESS'
}

describe('SignUp Complete', () => {
  beforeEach(() => {
    getByTokenSignup = stub(signupRepo, "getByToken")
    updateStatusSignup = stub(signupRepo, "updateStatus")
  })

  afterEach(() => restore())

  it('should update singup status complete', async () => {
    const token = 'some-token'
    getByTokenSignup.resolves(signup)

    await signupComplete(token)

    expect(updateStatusSignup).to.have.been.calledWith(signup, 'COMPLETE')
  })
})
