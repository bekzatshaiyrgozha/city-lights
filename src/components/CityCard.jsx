import { useState } from 'react'

const statusLabels = { want: 'Want to visit', planned: 'Planned', visited: 'Visited' }

export default function CityCard({ city, onRemove, onStatusChange, onReset }) {
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  console.log(`CityCard rendered: ${city.name}`)

  return (
    <div className={`card card-${city.status}`}>
      <div className="card-cover">
        {city.image ? (
          <img src={city.image} alt={city.name} />
        ) : (
          <div className="cover-fallback">{city.name[0]}</div>
        )}
        <span className={`badge badge-${city.status}`}>{statusLabels[city.status]}</span>
        <div className="cover-title">
          <h3>{city.name}</h3>
          <p className="meta">{city.country} · {city.days} days</p>
        </div>
      </div>

      <div className="card-body">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={n <= rating ? 'star active' : 'star'}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
          <span>{rating > 0 ? `${rating}/5` : 'Rate it'}</span>
        </div>

        {rating === 5 && <p className="hint">Dream city! Add it to your plans.</p>}

        <button className="link-btn" onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? 'Hide notes' : 'Show notes'}
        </button>

        {showNotes && (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Places to see, food to try..."
          />
        )}

        <div className="card-actions">
          <select value={city.status} onChange={(e) => onStatusChange(city.id, e.target.value)}>
            <option value="want">Want to visit</option>
            <option value="planned">Planned</option>
            <option value="visited">Visited</option>
          </select>
          <button onClick={() => onReset(city.id)}>Reset</button>
          <button className="danger" onClick={() => onRemove(city.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}
