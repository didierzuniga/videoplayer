import gravatar from '../gravatar'

describe(
  'Gravatar function',
  () => {
    it('Should return gravatar default url', () => {
      const email = 'didier35@hotmail.com'
      const gravatarDefaultImage = 'https://gravatar.com/avatar/b15d049538b2677ac6df083527792395'
      expect(gravatar(email)).toEqual(gravatarDefaultImage)
    })
  }
)