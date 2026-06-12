import VideoHero from './components/sections/VideoHero.jsx'
import Humanitarian from './components/sections/Humanitarian.jsx'
import Engineering from './components/sections/Engineering.jsx'
import Pillars from './components/sections/Pillars.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Unae from './components/sections/Unae.jsx'
import Marquee from './components/ui/Marquee.jsx'
import CursorSpotlight from './components/ui/CursorSpotlight.jsx'

const TECH_ITEMS = [
  'OpenCV',
  'MediaPipe',
  '21 Landmarks 3D',
  'Python 3',
  'C++ Nativo',
  'Edge Computing',
  'Máquina de Estados Finitos',
]

const CAUSE_ITEMS = [
  'Signal for Help',
  'Alerta Silenciosa',
  'Visión Artificial',
  'Seguridad Ciudadana',
  'UNAE Encarnación',
]

export default function App() {
  return (
    <main>
      <CursorSpotlight />
      <VideoHero />
      <Marquee items={TECH_ITEMS} />
      <Humanitarian />
      <Engineering />
      <Pillars />
      <Gallery />
      <Marquee items={CAUSE_ITEMS} reverse />
      <Unae />
    </main>
  )
}
