const filters = [
  { value: 'all', label: 'All' },
  { value: 'want', label: 'Want to visit' },
  { value: 'planned', label: 'Planned' },
  { value: 'visited', label: 'Visited' },
]

export default function FilterBar({ filter, onFilterChange, onReverse }) {
  console.log('FilterBar rendered')

  return (
    <div className="filter-bar">
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? 'active' : ''}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button onClick={onReverse}>⇅ Reverse</button>
    </div>
  )
}