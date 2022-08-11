/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

export const CanvasContext = createContext({
  canvas: undefined,
  setCanvas: () => {},
  canvas2: undefined,
  setCanvas2: () => {},
  isLoading: false,
  setLoading: () => {},
})

export const CanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [canvas2, setCanvas2] = useState(null)
  const [isLoading, setLoading] = useState(false)

  return (
    <CanvasContext.Provider
      value={{ canvas, setCanvas, canvas2, setCanvas2, isLoading, setLoading }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)
