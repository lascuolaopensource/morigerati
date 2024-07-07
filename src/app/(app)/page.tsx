import Polaroid from '../components/polaroid'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar backgroundColor="bg-white" currentPage="/" />
      {/*<Polaroid imageUrl="/loremPic.jpg" title="Ciao" color="bg-luogoColor" />*/}
    </div>
  )
}
