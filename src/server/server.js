import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import helmet from 'helmet'
import boom from '@hapi/boom'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import webpack from 'webpack'
import main from './routes/main'

dotenv.config()

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 8000

const app = express()

// Body parser
app.use(express.json())
app.use(cookieParser())
// app.use(express.static(`${__dirname}/public`))

// Basic strategy
require('./utils/auth/strategies/basic')

// Facebook strategy
require('./utils/auth/strategies/facebook')

if (ENV === 'development') {
  console.log('Loading development config...')
  const webpackConfig = require('../../webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  }
  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
} else {
  console.log(`Loading production config...`)
  app.use(helmet())
  app.use(helmet.permittedCrossDomainPolicies())
  app.disable('x-powered-by')
}

app.post(
  '/auth/sign-in',
  async (req, res, next) => {
    passport.authenticate('basic', async (error, data) => {
      try {
        if (error || !data) {
          return next(boom.unauthorized())
        }
        req.login(data, { session: false }, async (error) => {
          if (error) {
            next(error)
          }
          const { token, ...user } = data
          res.clearCookie('token')
          res.cookie('token', token, {
            httpOnly: !(ENV === 'development'),
            secure: !(ENV === 'development'),
            domain: 'https://waupp.com'
          })

          res.status(200).json(user.user)
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  }
)

app.post(
  '/auth/sign-up',
  async (req, res, next) => {
    const { body: user } = req
    try {
      const userData = await axios({
        url: `${process.env.API_URL}/api/auth/sign-up`,
        method: 'post',
        data: user
      })

      res.status(201).json({
        name: req.body.name,
        email: req.body.email,
        id: userData.data.data,
        message: 'user created'
      })
    } catch (error) {
      next(error)
    }
  }
)

// app.get(
//   '/auth/facebook',
//   passport.authenticate('facebook')
// )

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { session: false }),
//   function(req, res, next) {
//     if (!req.user) {
//       next(boom.unauthorized())
//     }

//     const { token, ...user } = req.user

//     res.cookie('token', token, {
//       httpOnly: !config.dev,
//       secure: !config.dev
//     })

//     res.status(200).json(user)
//   }
// )

app.get('*', main)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`Server running on ${PORT} port`)
})

























// import express from 'express'
// // import dotenv from 'dotenv'
// import webpack from 'webpack'
// import main from './routes/main'
// import helmet from 'helmet'

// const { config } = require('./config')

// // dotenv.config()

// const ENV = process.env.NODE_ENV
// const PORT = process.env.PORT || 3000

// const app = express()
// app.use(express.static(`${__dirname}/public`))

// if (config.dev === true) {
//   console.log('Loading development config...')
//   const webpackConfig = require('../../webpack.config')
//   const webpackDevMiddleware = require('webpack-dev-middleware')
//   const webpackHotMiddleware = require('webpack-hot-middleware')
//   const compiler = webpack(webpackConfig)
//   const serverConfig = {
//     contentBase: `http://localhost:${config.port}`,
//     port: config.port,
//     publicPath: webpackConfig.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     stats: { colors: true }
//   }
//   app.use(webpackDevMiddleware(compiler, serverConfig))
//   app.use(webpackHotMiddleware(compiler))
// } else {
//   console.log(`Loading production config`)
//   app.use(helmet())
//   app.use(helmet.permittedCrossDomainPolicies())
//   app.disable('x-powered-by')
// }

// app.get('*', main)

// app.listen(config.port, (err) => {
//   if (err) console.log(err)
//   console.log(`Server running on ${config.port} port`)
// })