import React from 'react'
import { Song } from '../types'

interface PlaylistProps {
  playlist: Song[]
  onRemoveFromPlaylist: (songId: string) => void
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, onRemoveFromPlaylist }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Playlist</h2>
      {playlist.length === 0 ? (
        <p className="text-gray-500">Your playlist is empty.</p>
      ) : (
        <ul className="space-y-2">
          {playlist.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{song.title}</h3>
                <p className="text-gray-600">{song.artist}</p>
              </div>
              <button
                onClick={() => onRemoveFromPlaylist(song.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Playlist
