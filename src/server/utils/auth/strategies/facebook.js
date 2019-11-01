import passport from 'passport'
const FacebookStrategy = require('passport-facebook')
import boom from '@hapi/boom'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profilerFields: ['id', 'email', 'displayName'],
    enableProof: true
  },
  async (accessToken, refreshToken, profile, done) => {
      const email = profile.email
          ? profile.email
          : `${profile.id}@facebook.com`;
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-provider`,
        method: 'post',
        data: {
            name: profile.displayName,
            email: email,
            password: profile.id,
            apiKeyToken: process.env.API_KEY_TOKEN
        }
      })

      if (!data || status !== 200) {
        return done(boom.unauthorized(), false)
      }

      return done(null, data)
  }
))