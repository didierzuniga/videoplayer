import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'
import Routes from '../../frontend/routes/serverRoutes'
import Layout from '../../frontend/components/Layout'
import reducer from '../../frontend/reducers'
import initialState from '../../frontend/initialState'
import render from '../render'
import { prototype } from 'stream';

let initState = initialState

const main = (req, res, next) => {
  try {
    if (!(JSON.stringify(req.cookies) === '{}')) {
      const { email, name, id } = req.cookies
      initState = {
        user: {
          id,
          email,
          name
        },
        playing: {},
        myList: [],
        trends: [],
        originals: []
      }
    }

    console.log(initState.user)
    
    const isLogged = (initState.user.id)
    const store = createStore(reducer, initState)
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <Layout>
            {renderRoutes(Routes(isLogged))}
          </Layout>
        </StaticRouter>
      </Provider>
    )
    const preloadedState = store.getState()
    res.send(render(html, preloadedState))
  } catch (error) {
    next(error)
  }
}

export default main