import { useLayoutEffect, useState, useRef } from 'react'
import { fabric } from 'fabric'
import * as WF from 'webfontloader'

import { useCanvas } from 'context/CanvasContext'
import { Spinner } from 'components'
import {
  BACKGROUND_COLOR,
  HEIGHT,
  WIDTH,
  createTextLayer,
  createGradientBackground,
  createCanvasFilters,
  createBackground,
  limitMovement,
  getRandomColorPalette,
  getRandomFont,
} from 'lib'
import { fonts } from 'data'

export default function App() {
  const canvasRef = useRef()
  const { canvas, setCanvas, setLoading, isLoading } = useCanvas()
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
      preserveObjectStacking: true,
      perPixelTargetFind: false,
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
  useLayoutEffect(() => {
    setLoading(true)
    const list = fonts.map((item) => item.value)
    setTimeout(() => {
      WF.load({
        google: {
          families: list,
        },
        active: () => {
          sessionStorage.fonts = true
          setLoading(false)
          // console.clear();
        },
      })
    }, 100)
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
      const palette = getRandomColorPalette()
      setTimeout(() => {
        createTextLayer(canvas, kw, fabric, palette, getRandomFont().name)
        // createGradientBackground(canvas, fabric, palette)
        // createCanvasFilters(canvasRef.current)
        createBackground(canvasRef.current, canvas, fabric, palette)
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
          <canvas
            id='canvas'
            className='w-full h-full relative'
            ref={canvasRef}
          />
        </div>
      </div>
    </>
  )
}
