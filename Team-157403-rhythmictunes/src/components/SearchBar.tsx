import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for songs, artists..."
        className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-200 pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="text-gray-500" size={20} />
      </div>
    </div>
  )
}

export default SearchBar
