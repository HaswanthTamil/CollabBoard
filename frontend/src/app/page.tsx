"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import "../styles/globals.css"

const SplashScreen = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/ideaboard")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="flex flex-col items-center"
      >
        <Image
          src="/logo.png"
          alt="CollabBoard Logo"
          width={100}
          height={100}
          priority
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white text-xl font-semibold mt-4"
        >
          CollabBoard
        </motion.h1>
      </motion.div>
    </div>
  )
}

export default SplashScreen
