/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

export const CanvasContext = createContext({
  canvas: undefined,
  setCanvas: () => {},
  isLoading: false,
  setLoading: () => {},
})

export const CanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [isLoading, setLoading] = useState(false)

  return (
    <CanvasContext.Provider
      value={{ canvas, setCanvas, isLoading, setLoading }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)
