import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faThumbsUp,
  faThumbsDown,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faThumbsDown, faUser, faRotateLeft)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
