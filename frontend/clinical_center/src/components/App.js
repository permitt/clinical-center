import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import '../styles/css/App.css'
import Routes from './Routes/index'
import store from '../store/Store'
import '../styles/css/bootstrap.min.css'

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Routes />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
