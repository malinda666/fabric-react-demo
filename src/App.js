import React from 'react'
// import { Outlet } from 'react-router-dom'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

export default function App() {
  // return <Outlet />
  const { editor, onReady } = useFabricJSEditor()
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  )
}
