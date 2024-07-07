import Polaroid from '../components/polaroid'
import Navbar from '../components/navbar'
import { findCollection, findGlobals } from '@/utils/fetch'

interface Statement {
  Home: {
    statement: {}
  }
}

interface TestoHome {
  Home: {
    testoHome: {}
  }
}
const Home = async () => {
  let statement = null
  let testoHome = null

  try {
    const [globalData] = await Promise.all([findGlobals({ slug: 'home' })])

    statement = JSON.stringify(globalData.statement)
    testoHome = JSON.stringify(globalData.testoHome)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <div className="bg-white">
      <Navbar backgroundColor="bg-white" currentPage="/" />
      {statement ? (
        <p className="font-normal text-sm pt-4 pb-4 leading-4">{statement}</p>
      ) : (
        <p>Error loading Luoghi text data</p>
      )}

      {testoHome ? (
        <p className="font-normal text-sm pt-4 pb-4 leading-4">{testoHome}</p>
      ) : (
        <p>Error loading Luoghi text data</p>
      )}
      {/*<Polaroid imageUrl="/loremPic.jpg" title="Ciao" color="bg-luogoColor" />*/}
    </div>
  )
}

export default Home
