import { useLayoutEffect, useState } from 'react'
import { fabric } from 'fabric'
import { useCanvas } from 'context/CanvasContext'

import {
  BACKGROUND_COLOR,
  HEIGHT,
  WIDTH,
  createTextLayer,
  generateGradientColor,
} from 'lib'

export default function App() {
  const { canvas, setCanvas } = useCanvas()
  const [keyword, setKeyword] = useState('')

  useLayoutEffect(() => {
    if (canvas) return
    const _canvas = new fabric.Canvas('canvas', {
      height: HEIGHT,
      width: WIDTH,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: BACKGROUND_COLOR,
      backgroundImage: undefined,
    })
    _canvas.requestRenderAll()
    setCanvas(_canvas)
  }, [])

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (keyword === '') return

      createTextLayer(canvas, keyword, fabric)
      generateGradientColor(canvas, fabric)
    }
  }

  return (
    <div className='max-w-[600px] mx-auto flex flex-col p-4 overflow-x-hidden'>
      <div className='flex items-center justify-center my-4'>
        <label
          htmlFor='keyword'
          className='inline-block mr-2 text-sm font-medium text-gray-900'
        >
          Keyword
        </label>
        <input
          type='text'
          id='keyword'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-full p-2.5'
          placeholder='Enter your keyword'
          value={keyword}
          onChange={onChangeKeyword}
          onKeyPress={handleEnter}
        />
      </div>
      <div className='bg-gray-200' style={{ width: WIDTH, height: HEIGHT }}>
        <canvas id='canvas' className='w-full h-full relative' />
      </div>
    </div>
  )
}
