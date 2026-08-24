import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from "./redux/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#121217',
            color: '#f4f4f5',
            border: '1px solid #22222a',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#6366f1', // Indigo to match theme accent
              secondary: '#121217',
            },
          },
        }}
      />
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
