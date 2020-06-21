import { expect } from 'chai'
import { SignupInitParams }  from '@src/types/signup'
import signupInit from '@src/controllers/signup-init'

describe('SignUp Initialization', () => {
  it('should return a signup token as response to signup initialization', async () => {
    const signupParams: SignupInitParams = {
      fullname: 'Somebody',
      dateOfBirth: '1999-01-01',
      address: 'Av. Some street, 123'
    }

    const signup = await signupInit(signupParams)

    expect(signup.token).to.be.a("string").that.has.length(36)
  });
});
