import signupRepo from '@src/ports/repos/signup'
import singupNotifier from '@src/ports/notifiers/singup'

export default async (token: string): Promise<void> => {
  const signup = await signupRepo.getByToken(token)
  await signupRepo.updateStatus(signup, 'COMPLETE')
  await singupNotifier.complete(signup)
}
