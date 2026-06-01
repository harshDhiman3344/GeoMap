import { useState } from "react";
import axios from "axios";

const JournalForm = ({location, onSubmit, onClose}) => {
    const [text, setText] = useState('')
    const [loading, setLoading]  =useState(false)
    const [error, setError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

            if(!text.trim()){
                setError('Please Write Somethingggg!')
                return

            }

            setLoading(false)
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/journals`, {
                 text,
                coordinates: [location.lng, location.lat]
                })

                setText('')
                onSubmit()
            } catch(err){
                setError('failed to save your journal, Try again.')
                console.error(err)

            } finally {
                setLoading(false)

            }
        }
    return (
    <div className="form-overlay">
      <div className="form-card">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>New Journal Entry</h2>
        <p className="coords">
          📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={5}
            placeholder="What happened here?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}
