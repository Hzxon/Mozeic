import React from 'react'

const MusicPlayer = () => {
  return (
    <footer className='music-player'>
        <div className='player-track'>
            <img src="https://placehold.co/60x60" alt="Current track" />
            <div>
                <h4>Track One</h4>
                <p>Artist One</p>
            </div>
        </div>

        <div className='player-controls'>
            <div className='controls'>
                <button>⏮</button>
                <button>▶</button>
                <button>⏭</button>
            </div>

            <div className='progress'>
                <span>0:00</span>

                <input type="range" min="0" max="100" defaultValue="0" />


                <span>3:42</span>
            </div>

        </div>

        <div className="volume">
            <span>🔊</span>

            <input type="range" min="0" max="100" defaultValue="80" />
        </div>
        
    </footer>
  )
}

export default MusicPlayer