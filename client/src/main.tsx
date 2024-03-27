import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './routes/config/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
