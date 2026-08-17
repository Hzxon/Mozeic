import React from 'react'

const TrackCard = ({ track }) => {
  return (
    <div className='track-card'>
        <img src={track.cover} alt={track.title} className='track-cover' />

        <div className='track-info'>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
        </div>
    </div>
  )
}

export default TrackCard