import Navbar from './components/layout/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import Humanitarian from './components/sections/Humanitarian.jsx'
import Engineering from './components/sections/Engineering.jsx'
import Pillars from './components/sections/Pillars.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Unae from './components/sections/Unae.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Humanitarian />
        <Engineering />
        <Pillars />
        <Gallery />
        <Unae />
      </main>
    </>
  )
}
