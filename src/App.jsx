import { useEffect, useState } from 'react'
import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Recognition from './components/Recognition'
import Approach from './components/Approach'
import Services from './components/Services'
import Membership from './components/Membership'
import Provider from './components/Provider'
import Consult from './components/Consult'
import Footer from './components/Footer'
import Staff from './components/Staff'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash === '#staff') {
    return <Staff />
  }

  return (
    <>
      <Nav />
      <Hero />
      <Recognition />
      <Approach />
      <Services />
      <Membership />
      <Provider />
      <Consult />
      <Footer />
    </>
  )
}
