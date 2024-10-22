import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

// console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={176344730742-d2215e6pfoilhu3phfrhfehfpci4sq3j.apps.googleusercontent.com}>
      <Toaster/>
        <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
