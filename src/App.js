import React from "react"
import "App.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "error-polyfill"
import {
  EthersProviderContext,
} from "near-social-vm"
import "react-bootstrap-typeahead/css/Typeahead.bs5.css"
import "react-bootstrap-typeahead/css/Typeahead.css"

import { useEthersProviderContext } from "@/data/web3"
import { AppContextProvider } from "@/context/AppContext"
import { AppRouter } from "@/routes/AppRouter"

function App() {
  const ethersProviderContext = useEthersProviderContext()

  return (
    <div className="App" style={{ height: "100vh" }}>
      <EthersProviderContext.Provider value={ethersProviderContext}>
        <AppContextProvider>
          <AppRouter />
        </AppContextProvider>
      </EthersProviderContext.Provider>
    </div>
  )
}

export default App
