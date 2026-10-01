import { useState } from 'react'
import Lamp from './components/Lamp'
import AddCityForm from './components/AddCityForm'
import FilterBar from './components/FilterBar'
import CityCard from './components/CityCard'

const initialCities = [
  { id: 1, name: 'Almaty', country: 'Kazakhstan', days: 3, status: 'visited', resetCount: 0 },
  { id: 2, name: 'Tokyo', country: 'Japan', days: 7, status: 'planned', resetCount: 0 },
  { id: 3, name: 'Paris', country: 'France', days: 5, status: 'want', resetCount: 0 },
  { id: 4, name: 'Istanbul', country: 'Turkey', days: 4, status: 'want', resetCount: 0 },
  { id: 5, name: 'New York', country: 'USA', days: 6, status: 'planned', resetCount: 0 },
]

async function fetchCityImage(name) {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*' +
    '&generator=search&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=800' +
    `&gsrsearch=${encodeURIComponent(name + ' city')}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const pages = data.query ? Object.values(data.query.pages) : []
    return pages[0]?.thumbnail?.source || null
  } catch {
    return null
  }
}

export default function App() {
  const [lightOn, setLightOn] = useState(false)
  const [cities, setCities] = useState(initialCities)
  const [filter, setFilter] = useState('all')
  const [nextId, setNextId] = useState(6)

  console.log('App rendered')

  function setCityImage(id, image) {
    if (!image) return
    setCities((prev) => prev.map((c) => (c.id === id ? { ...c, image } : c)))
  }

  function loadImages(list) {
    list.filter((c) => !c.image).forEach((c) => {
      fetchCityImage(c.name).then((image) => setCityImage(c.id, image))
    })
  }

  function toggleLight() {
    if (!lightOn) loadImages(cities)
    setLightOn(!lightOn)
  }

  function addCity(name, country, days) {
    const newCity = { id: nextId, name, country, days, status: 'want', resetCount: 0 }
    setCities([...cities, newCity])
    setNextId(nextId + 1)
    loadImages([newCity])
  }

  function removeCity(id) {
    setCities(cities.filter((c) => c.id !== id))
  }

  function changeStatus(id, newStatus) {
    setCities(cities.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
  }

  function resetCity(id) {
    setCities(cities.map((c) => (c.id === id ? { ...c, resetCount: c.resetCount + 1 } : c)))
  }

  function reverseList() {
    setCities([...cities].reverse())
  }


  function handleMouseMove(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = x - rect.width / 2
    const dy = Math.max(y, 1)
    let angle = -Math.atan2(dx, dy) * (180 / Math.PI)
    angle = Math.max(-55, Math.min(55, angle))
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--lamp-angle', `${angle}deg`)
  }

  const visibleCities = filter === 'all' ? cities : cities.filter((c) => c.status === filter)

  return (
    <div className={`app ${lightOn ? 'lit' : ''}`} onMouseMove={handleMouseMove}>
      <Lamp isOn={lightOn} onToggle={toggleLight} />

      {lightOn && (
        <main className="dashboard">
          <section className="panel">
            <AddCityForm onAdd={addCity} />
            <FilterBar filter={filter} onFilterChange={setFilter} onReverse={reverseList} />
          </section>

          {visibleCities.length === 0 ? (
            <p className="empty">No cities here yet. Add one above.</p>
          ) : (
            <div className="grid">
              {visibleCities.map((city) => (
                <CityCard
                  key={`${city.id}-${city.resetCount}`}
                  city={city}
                  onRemove={removeCity}
                  onStatusChange={changeStatus}
                  onReset={resetCity}
                />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  )
}