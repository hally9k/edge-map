import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { TrackerMap } from 'components/map'
import { Auth } from 'components/auth'
import { AuthContextProvider } from './state/auth-context'

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/">
          <AuthContextProvider>
            <Auth>
              <Switch>
                <Route path="/" render={() => <TrackerMap />} />
              </Switch>
            </Auth>
          </AuthContextProvider>
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App
