import app from "./app.mjs"
import './utils/envImporter.mjs'

try {
    let port = (!process?.env?.PORT && process?.env?.PORT === '' && process?.env?.PORT === null ) ? 3000 : process.env.PORT;
    app.server.listen(port);
    console.log('App running 🎉http://localhost:' + port);
  } catch (e) {
    console.log('Something failed to run the application. ' + e.message);
    console.error(e);
  }