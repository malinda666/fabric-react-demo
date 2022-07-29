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
    <div className='max-w-xl mx-auto flex flex-col p-4'>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={onAddCircle}
        >
          Add circle
        </button>
        <button
          type='button'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={onAddRectangle}
        >
          Add Rectangle
        </button>
      </div>
      <FabricJSCanvas className='bg-gray-200 w-full h-96' onReady={onReady} />
    </div>
  )
}
