import { useState } from 'react'
import axios from 'axios'

const JournalList = ({ journals, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/journals/${id}`)
      onDelete()
    } catch (err) {
      console.error('Error deleting journal:', err)
    } finally {
      setDeletingId(null)
    }
  }

  if (journals.length === 0) {
    return (
      <div className="journal-list">
        <p className="empty">No entries yet. Click on the map to add one!</p>
      </div>
    )
  }

  return (
    <div className="journal-list">
      <h2>Your Entries</h2>
      {journals.map((journal) => (
        <div key={journal._id} className="journal-card">
          <div className="journal-card-header">
            <span className="journal-date">
              📅 {new Date(journal.date).toLocaleDateString()}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(journal._id)}
              disabled={deletingId === journal._id}
            >
              {deletingId === journal._id ? '...' : '🗑️'}
            </button>
          </div>
          <p className="journal-text">{journal.text}</p>
          <span className="journal-coords">
            📍 {journal.location.coordinates[1].toFixed(4)}, {journal.location.coordinates[0].toFixed(4)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default JournalList