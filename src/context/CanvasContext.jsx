/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  // useEffect
} from 'react'
// import { fabric } from 'fabric'

export const CanvasContext = createContext({ canvas: undefined, setCanvas: () => {} })

export const CanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)

  // useEffect(() => {
  //   const canvas = new fabric.Canvas('canvas', {
  //     height: 600,
  //     width: 800,
  //     fireRightClick: true,
  //     fireMiddleClick: true,
  //     stopContextMenu: true,
  //     backgroundColor: undefined,
  //     backgroundImage: undefined,
  //   })
  //   canvas.requestRenderAll()
  //   setCanvas(canvas)
  // }, [])

  return <CanvasContext.Provider value={{ canvas, setCanvas }}>{children}</CanvasContext.Provider>
}

export const useCanvas = () => useContext(CanvasContext)
