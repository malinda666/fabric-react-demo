import { useLayoutEffect, useState } from 'react'
import { fabric } from 'fabric'
import { useCanvas } from 'context/CanvasContext'

import { Spinner } from 'components'

import {
  BACKGROUND_COLOR,
  HEIGHT,
  WIDTH,
  createTextLayer,
  generateGradientColor,
  limitMovement,
  getRandomColorPalette,
} from 'lib'

import { colorPalettes } from 'data/colorPalettes'

export default function App() {
  const { canvas, setCanvas, setLoading, isLoading } = useCanvas()
  const [keyword, setKeyword] = useState('')
  const [palette, setPalette] = useState(colorPalettes[0])

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

    /** limit movements on edges */
    if (!canvas) return
    canvas.on('object:moving', function (e) {
      const obj = e.target
      limitMovement(obj)
    })
  }, [])

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (keyword === '') return
      setLoading(true)
      let kw = keyword
      kw = kw[0].toUpperCase() + kw.substring(1)
      setPalette(getRandomColorPalette())
      setTimeout(() => {
        createTextLayer(canvas, kw, fabric, palette)
        generateGradientColor(canvas, fabric, palette)
        setLoading(false)
      }, 100)
    }
  }

  return (
    <>
      <div className='max-w-[600px] mx-auto flex flex-col m-4 overflow-x-hidden'>
        <div className='flex items-center justify-center my-4 w-full'>
          <label
            htmlFor='keyword'
            className='inline-block mr-2 text-sm font-medium text-gray-900'
          >
            Keyword
          </label>
          <input
            type='text'
            id='keyword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  inline-block w-full p-2.5 m-1'
            placeholder='Enter your keyword'
            value={keyword}
            onChange={onChangeKeyword}
            onKeyPress={handleEnter}
          />
          <div className='ml-4'>{isLoading && <Spinner type='dark' />}</div>
        </div>
        <div className='bg-gray-200' style={{ width: WIDTH, height: HEIGHT }}>
          <canvas id='canvas' className='w-full h-full relative' />
        </div>
      </div>
    </>
  )
}
