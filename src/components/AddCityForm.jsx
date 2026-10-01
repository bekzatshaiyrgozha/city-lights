import { useState } from 'react'

export default function AddCityForm({ onAdd }) {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [days, setDays] = useState('')

  console.log('AddCityForm rendered')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !country.trim()) return
    onAdd(name.trim(), country.trim(), Number(days) || 1)
    setName('')
    setCountry('')
    setDays('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="City" />
      <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
      <input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days" />
      <button type="submit">Add city</button>
    </form>
  )
}