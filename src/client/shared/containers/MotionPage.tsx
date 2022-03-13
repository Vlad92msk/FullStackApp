import React from 'react'
import { motion } from 'framer-motion'


export const WithTransition: React.FC = ({ children }) => {

  return (
    <>
      {children}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          background: 'rgba(64,67,77,0.71)',
          transformOrigin: 'right',
          zIndex: 9999
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: .8, ease: 'easeInOut' }}
      />
    </>
  )
}

