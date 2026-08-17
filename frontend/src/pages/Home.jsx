import React, { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import RecentlyAdded from '../components/RecentlyAdded.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'

const Home = () => {
  const [currentTrack, setCurrentTrack] = useState()

  const decode = {
    id: "024b92e5-d308-4290-980d-31eef464ad96",
    title: "Decode"
  }

  return (
    <div className='home'>
        <main className='home-content'>
            <SearchBar />

            <RecentlyAdded />
        </main>

        <MusicPlayer track={decode}/>
    </div>
  )
}

export default Home