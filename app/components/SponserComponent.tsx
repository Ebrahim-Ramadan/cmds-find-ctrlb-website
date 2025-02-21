'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export default function SponserComponent() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const createHeart = useCallback(() => {
    if (hearts.length >= 4) return // Limit to 4 hearts

    const id = Date.now()
    const x = Math.random() * 40 - 20 // Random x position between -30 and 30
    const y = Math.random() * -40 - 20 // Random y position between -20 and -60

    setHearts(prevHearts => [...prevHearts, { id, x, y }])

    // Remove the heart after 1 second
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id))
    }, 1000)
  }, [hearts])

  const triggerHearts = useCallback(() => {
    for (let i = 0; i < 4; i++) {
      setTimeout(createHeart, i * 100)
    }
  }, [createHeart])

  const handleMouseEnter = () => {
    triggerHearts()
    timeoutRef.current = setInterval(triggerHearts, 1000)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="mx-auto p-2 max-w-3xl relative inline-block w-full flex justify-between z-50">
      <img
      src='/terminal-svgrepo-com.svg'
      className='w-8'
      />
      <a 
        ref={anchorRef}
        onClick={triggerHearts}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        href='https://github.com/Ebrahim-Ramadan/cmds-find-ctrlb'
        className="cursor-pointer bg-[#1C0E33] text-white hover:bg-primary/90 px-4 py-2 rounded-xl font-semibold"
      >
        Sponser Us
      </a>
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="absolute w-4 h-4 animate-float-move"
          style={{
            right: `calc(10px + ${heart.x}px)`, // Adjust hearts to the right edge
            bottom: `calc(40px + ${heart.y}px)`, // Adjust hearts to float above the button
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#7636DD"
            stroke="#7636DD"
            strokeWidth="2"
          />
        </svg>
      ))}
    </div>
  )
}
