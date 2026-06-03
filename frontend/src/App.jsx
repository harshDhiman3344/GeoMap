import { useState, useEffect } from 'react'
import axios from 'axios'
import MapView from './components/MapView'
import JournalForm from './components/JournalForm'
import JournalList from './components/JournalList'
import './App.css'

function App() {
  const [journals, setJournals] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showList, setShowList] = useState(false)

  const fetchJournals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/journals`)
      setJournals(res.data)
    } catch (err) {
      console.error('Error fetching journals:', err)
    }
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setSelectedLocation(null)
    fetchJournals()
  }

  const handleFormClose = () => {
    setShowForm(false)
    setSelectedLocation(null)
  }

  return (
    <div className="app">
     <div className='title'>
      <span>GeoJournal</span>
      <button className='list-toggle' onClick={()=>setShowList(!showList)}>
        {showList ? 'Map' : 'Entries'}
      </button>
     </div>
     <div className='container'>
      {showList ? (
        <JournalList journals={journals} onDelete={fetchJournals} />
      ) : (
        <MapView journals={journals} onMapClick={handleMapClick} />
      )}
      {showForm && (
        <JournalForm
          location={selectedLocation}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
     </div>
    </div>
  )
}

export default App