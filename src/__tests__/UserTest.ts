import User from '../User'

describe('User', (): void => {
  describe('constructor', (): void => {
    it('can do', (): void => {
      const user = new User()
      expect(user).toBeInstanceOf(User)
    })
  })
})
