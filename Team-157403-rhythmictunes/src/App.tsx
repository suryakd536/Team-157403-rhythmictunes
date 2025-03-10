import React, { useState, useEffect } from 'react'
import SongList from './components/SongList'
import Playlist from './components/Playlist'
import PlayerControls from './components/PlayerControls'
import SearchBar from './components/SearchBar'
import { Song } from './types'
import { v4 as uuidv4 } from 'uuid'

const mockSongs: Song[] = [
  {
    id: uuidv4(),
    title: 'Acoustic Breeze',
    artist: 'Purrple Cat',
    genre: 'Acoustic',
    releaseDate: '2020-01-05',
    url: 'https://example.com/music/acoustic-breeze.mp3',
    coverArtUrl: 'https://source.unsplash.com/300x300/?music',
  },
  {
    id: uuidv4(),
    title: 'Better Days',
    artist: 'Bensound',
    genre: 'Pop',
    releaseDate: '2019-03-12',
    url: 'https://example.com/music/better-days.mp3',
    coverArtUrl: 'https://source.unsplash.com/300x300/?concert',
  },
  {
    id: uuidv4(),
    title: 'Creative Minds',
    artist: 'Bensound',
    genre: 'Jazz',
    releaseDate: '2021-11-01',
    url: 'https://example.com/music/creative-minds.mp3',
    coverArtUrl: 'https://source.unsplash.com/300x300/?headphones',
  },
]

function App() {
  const [songs, setSongs] = useState<Song[]>(mockSongs)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [audio] = useState<HTMLAudioElement>(new Audio())

  useEffect(() => {
    if (currentSong) {
      audio.src = currentSong.url
      if (isPlaying) {
        audio.play().catch((error) => console.error('Playback failed:', error))
      }
    } else {
      audio.pause()
    }

    return () => {
      audio.pause()
    }
  }, [currentSong, isPlaying, audio])

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handleAddToPlaylist = (song: Song) => {
    setPlaylist([...playlist, song])
  }

  const handleRemoveFromPlaylist = (songId: string) => {
    setPlaylist(playlist.filter((song) => song.id !== songId))
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      audio.play().catch((error) => console.error('Playback failed:', error))
    } else {
      audio.pause()
    }
  }

  const handleNext = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
      const nextIndex = (currentIndex + 1) % songs.length
      setCurrentSong(songs[nextIndex])
    }
  }

  const handlePrev = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length
      setCurrentSong(songs[prevIndex])
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    audio.volume = newVolume
  }

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const filteredSongs = songs.filter((song) => {
    const searchTermLower = searchTerm.toLowerCase()
    return (
      song.title.toLowerCase().includes(searchTermLower) ||
      song.artist.toLowerCase().includes(searchTermLower) ||
      song.genre.toLowerCase().includes(searchTermLower)
    )
  })

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Music Streaming Platform</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Song List</h2>
            <SongList songs={filteredSongs} onSongSelect={handleSongSelect} />
          </div>
          <div>
            <Playlist playlist={playlist} onRemoveFromPlaylist={handleRemoveFromPlaylist} />
          </div>
        </div>
        <div className="mt-8">
          <PlayerControls
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrev={handlePrev}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default App
