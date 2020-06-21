import { expect } from 'chai'
import { SignupInitParams }  from '@src/types/signup'
import signupInit from '@src/controllers/signup-init'
import { SinonStub, stub, restore } from 'sinon';
import signupRepo from '@src/ports/repos/signup'

let insertSignup: SinonStub

const makeSignupParams = (): SignupInitParams => ({
  fullname: 'Somebody',
  dateOfBirth: '1999-01-01',
  address: 'Av. Some street, 123'
})

describe('SignUp Initialization', () => {
  beforeEach(() => {
    insertSignup = stub(signupRepo, "insert").resolves()
  })

  afterEach(() => restore())

  it('should return a signup token as response to signup initialization', async () => {
    const signupParams: SignupInitParams = makeSignupParams()
    const signup = await signupInit(signupParams)

    expect(signup.token).to.be.a("string").that.has.length(36)
  });

  it('should return a signup with init params that sent to the function', async () => {
    const signupParams: SignupInitParams = makeSignupParams()
    const signup = await signupInit(signupParams)

    expect(signup.initParams).to.be.deep.equal(signupParams)
  });

  it('should persist signup in the database', async () => {
    const signupParams: SignupInitParams = makeSignupParams()
    const signup = await signupInit(signupParams)

    expect(insertSignup).to.have.been.calledOnce
    expect(insertSignup).to.have.been.calledOnceWith(signup)
  });
});
