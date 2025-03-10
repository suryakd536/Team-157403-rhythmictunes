import React from 'react'
import { Song } from '../types'

interface SongListProps {
  songs: Song[]
  onSongSelect: (song: Song) => void
}

const SongList: React.FC<SongListProps> = ({ songs, onSongSelect }) => {
  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={() => onSongSelect(song)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
          </div>
          <span className="text-gray-500">{song.genre}</span>
        </div>
      ))}
    </div>
  )
}

export default SongList
