import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingTextProps {
  texts: string[]
  mainClassName?: string
  rotationInterval?: number
  transition?: any
}

export default function ImprovedRotatingText({
  texts,
  mainClassName = "",
  rotationInterval = 3000,
  transition = { type: "spring", damping: 30, stiffness: 400 },
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset the animation when component unmounts
  useEffect(() => {
    startRotation()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
      // Increment key to force re-render and restart animation
      setKey((prev) => prev + 1)
    }, rotationInterval)
  }

  // Animation variants for the entire word
  const wordVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-120%", opacity: 0 },
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className={mainClassName}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
