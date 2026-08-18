import { useEffect, useRef, useState } from 'react'

const MusicPlayer = ({ tracks }) => {
    const audioRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(0)

    const playTrack = (index) => { 
        if (index < 0 || index >= tracks.length) return

        setCurrentIndex(index)
    }

    const nextTrack = () => {
        if (currentIndex < tracks.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const previousTrack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const currentTrack = tracks[currentIndex]

    useEffect(() => {
        const audio = audioRef.current

        if (!audio || !currentTrack) {
            return;
        }

        audio.src = `api/tracks/${currentTrack.id}/stream`
        audio.load()

        setCurrentTime(0)
        setDuration(0)

        const playAudio = async() => {
            try {
                await audio.play()
            } catch (error) {
                console.error("Failed to autoplay:", error)
            }
        }

        audio.addEventListener("canplay", playAudio, { once: true })

        return () => {
            audio.removeEventListener("canplay", playAudio)
        }
    }, [currentTrack])

    useEffect(() => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        audio.volume = volume
    }, [volume])

    useEffect(() => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        const handleLoadedMetadata = () => {
            setDuration(audio.duration)
        }

        const handlePlay = () => {
            setIsPlaying(true)
        }

        const handlePause = () => {
            setIsPlaying(false)
        }

        audio.addEventListener("timeupdate", handleTimeUpdate)
        audio.addEventListener("loadedmetadata", handleLoadedMetadata)
        audio.addEventListener("play", handlePlay)
        audio.addEventListener("pause", handlePause)

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate)
            audio.removeEventListener(
                "loadedmetadata", 
                handleLoadedMetadata
            )
            audio.removeEventListener("play", handlePlay)
            audio.removeEventListener("pause", handlePause)
        }
    }, [])

  return (
    <div className="music-player">
        <audio 
            ref={audioRef}
        />

        <p>{currentTrack?.title ?? "No track selected"}</p>

        <button
            onClick={() => {
                if (isPlaying) {
                    audioRef.current.pause()
                    setIsPlaying(false)
                } else {
                    audioRef.current.play()
                    setIsPlaying(true)
                }
            }}        
        >
            {isPlaying ? "Pause" : "Play"}
        </button>

        <input 
            type="range" 
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(event) => {
                const time = Number(event.target.value)

                audioRef.current.currentTime = time
                setCurrentTime(time)
            }}
        />

        <input 
            type="range" 
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => {
                setVolume(Number(event.target.value))
            }}
        />

        <button onClick={previousTrack}>
            Previous
        </button>

        <button onClick={nextTrack}>
            Next
        </button>
    </div>
  )
}

export default MusicPlayer