import Signup, { SignupInitParams } from '@src/types/signup'
import { uuid } from 'uuidv4'

export default async (signupInitParams: SignupInitParams): Promise<Signup> => {
    return {
      token: uuid(),
      initParams: signupInitParams
    }
}
