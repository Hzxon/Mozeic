import React, { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import RecentlyAdded from '../components/RecentlyAdded.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'

const Home = () => {
  // const [currentTrack, setCurrentTrack] = useState()

  // const decode = {
  //   id: "024b92e5-d308-4290-980d-31eef464ad96",
  //   title: "Decode"
  // }

  const tracks = [
    { id: "024b92e5-d308-4290-980d-31eef464ad96", title: "Decode" },
    { id: "249cb32e-d092-492d-a106-309b760d38bd", title: "Breakaway" },
    { id: "7c450ce8-2278-4264-9dcd-d2f9ff696140", title: "That's What You Get" }
  ]

  return (
    <div className='home'>
        <main className='home-content'>
            <SearchBar />

            <RecentlyAdded />
        </main>

        <MusicPlayer tracks={tracks}/>
    </div>
  )
}

export default Home