import React from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume1, Volume } from 'lucide-react'
import { Song } from '../types'

interface PlayerControlsProps {
  currentSong: Song | null
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrev: () => void
  volume: number
  onVolumeChange: (volume: number) => void
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {currentSong ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800">{currentSong.title}</h3>
          <p className="text-gray-600">{currentSong.artist}</p>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <button onClick={onPrev} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <SkipBack size={30} />
            </button>
            <button onClick={onPlayPause} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              {isPlaying ? <Pause size={40} /> : <Play size={40} />}
            </button>
            <button onClick={onNext} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <SkipForward size={30} />
            </button>
          </div>
          <div className="flex items-center mt-4">
            {volume > 0 ? (
              <Volume1 size={20} className="text-gray-600 mr-2" />
            ) : (
              <Volume size={20} className="text-gray-600 mr-2" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500">No song selected.</p>
      )}
    </div>
  )
}

export default PlayerControls
