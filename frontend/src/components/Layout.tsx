import Navbar from './Navbar'
import Footer from './Footer'
import type { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-svh flex-col bg-base-200 text-base-content'>

        <Navbar/>

        <main className='flex-1'> {children}</main>

        <Footer />

    </div>
  )
}

export default Layout