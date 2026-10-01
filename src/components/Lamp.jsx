import { useState } from 'react'

export default function Lamp({ isOn, onToggle }) {
  const [pulling, setPulling] = useState(false)

  console.log('Lamp rendered')

  function handlePull() {
    if (pulling) return
    setPulling(true)
  }

  function handleAnimationEnd() {
    setPulling(false)
    onToggle()
  }

  return (
    <div className={`lamp ${isOn ? 'on' : ''}`}>
      <div className="lamp-wire" />
      <div className="lamp-shade" />
      <div className="lamp-bulb" />
      <div className="light-cone" />
      <button
        className={`cord ${pulling ? 'pulling' : ''}`}
        onClick={handlePull}
        onAnimationEnd={handleAnimationEnd}
        aria-label="Pull the cord"
      >
        <span className="cord-line" />
        <span className="cord-knob" />
      </button>
    </div>
  )
}