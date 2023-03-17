import Image from 'next/image'
import { motion } from 'framer-motion'

export function Bot () {
  return (

    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
      whileHover={{
        scale: 1.05,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.4, type: 'spring', stiffness: 80 }
      }}
      whileTap={{
        scale: 1.05,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.4, type: 'spring', stiffness: 80 }
      }}
      className='flex justify-center pt-4'
    >
      <Image
        src='/castrobot.svg'
        width={200}
        height={200}
        alt='Bot'
      />
    </motion.div>
  )
}
