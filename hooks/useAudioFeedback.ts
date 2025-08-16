"use client"

import { useCallback, useRef, useEffect, useState } from "react"

interface AudioFeedbackOptions {
  enabled?: boolean
  volume?: number
}

export const useAudioFeedback = (options: AudioFeedbackOptions = {}) => {
  const { enabled = true, volume = 0.1 } = options
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const initializeAudioContext = useCallback(() => {
    if (!enabled || audioContextRef.current || typeof window === "undefined") return

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      setIsInitialized(true)
    } catch (error) {
      console.warn("Audio context not supported:", error)
    }
  }, [enabled])

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine") => {
      if (!enabled || !audioContextRef.current || !isInitialized) return

      try {
        const oscillator = audioContextRef.current.createOscillator()
        const gainNode = audioContextRef.current.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination)

        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
        oscillator.type = type

        // Envelope for smooth sound
        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

        oscillator.start(audioContextRef.current.currentTime)
        oscillator.stop(audioContextRef.current.currentTime + duration)
      } catch (error) {
        console.warn("Error playing audio:", error)
      }
    },
    [enabled, volume, isInitialized],
  )

  const playHoverSound = useCallback(() => {
    playTone(800, 0.1, "sine")
  }, [playTone])

  const playClickSound = useCallback(() => {
    playTone(1000, 0.15, "triangle")
  }, [playTone])

  const playButtonHoverSound = useCallback(() => {
    playTone(600, 0.08, "sine")
  }, [playTone])

  const playButtonClickSound = useCallback(() => {
    playTone(1200, 0.12, "square")
  }, [playTone])

  useEffect(() => {
    // Initialize audio context on first user interaction
    const handleFirstInteraction = () => {
      initializeAudioContext()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("keydown", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [initializeAudioContext])

  return {
    playHoverSound,
    playClickSound,
    playButtonHoverSound,
    playButtonClickSound,
    isInitialized,
  }
}