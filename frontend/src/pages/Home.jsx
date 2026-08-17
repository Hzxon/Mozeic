import React from 'react'
import SearchBar from '../components/SearchBar.jsx'
import RecentlyAdded from '../components/RecentlyAdded.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'

const Home = () => {
  return (
    <div className='home'>
        <main className='home-content'>
            <SearchBar />

            <RecentlyAdded />
        </main>

        <MusicPlayer />
    </div>
  )
}

export default Home