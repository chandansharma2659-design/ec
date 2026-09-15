import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router'

import {  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)


