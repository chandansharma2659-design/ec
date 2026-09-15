import { Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react'
import Layout from './components/Layout'
import PageLoader from './components/PageLoader'

function App() {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return < PageLoader />
  }

  return (
     <Layout>
          
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <button className="btn btn-primary">click me</button>
     </Layout>
    
  )
}

export default App