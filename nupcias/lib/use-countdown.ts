'use client'

import { useEffect, useState } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  }
}

/**
 * Returns the time remaining until `dateISO`, updating every second.
 * Renders nothing meaningful on the server to avoid hydration mismatches.
 */
export function useCountdown(dateISO: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const target = new Date(dateISO).getTime()
    setTimeLeft(getTimeLeft(target))

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(target))
    }, 1000)

    return () => clearInterval(id)
  }, [dateISO])

  return timeLeft
}
