import getManifest from '../getManifest'

let files = false;
if (process.env.NODE_ENV !== 'development') files = getManifest()

// const isProd = (!config.dev)
// let srcs = {
//   mainCss: 'assets/app.css',
//   mainJs: 'assets/app.js',
//   vendorsJs: 'assets/vendor.js'
// }
// if (isProd) {
//   const files = getManifest()
//   srcs.mainCss = files['main.css']
//   srcs.mainJs = files['main.js']
//   srcs.vendorsJs = files['vendors.js']
// }

const render = (html, preloadedState) => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Video Player</title>
        <link rel="stylesheet" href="${files ? files['main.css'] : 'assets/app.css'}" type="text/css" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="${files ? files['main.js'] : 'assets/app.js'}" type="text/javascript"></script>
        <script src="${files ? files['vendors.js'] : 'assets/vendor.js'}" type="text/javascript"></script>
      </body>
    </html>
  `)
}

export default render