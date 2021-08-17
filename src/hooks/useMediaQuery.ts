import { useEffect, useState } from 'react'

const useMediaQuery = () => {
  const [width, setWidth] = useState(() => window.innerWidth)

  const handler = (e: any) => {
    setWidth(e.target.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [])

  return width
}

export default useMediaQuery
