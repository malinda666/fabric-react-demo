/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useState, useRef } from 'react'
import { fabric } from 'fabric'
import * as WF from 'webfontloader'
import 'canvas-toBlob/canvas-toBlob'

import { useCanvas } from 'context/CanvasContext'
import { Spinner } from 'components'
import {
  BACKGROUND_COLOR,
  HEIGHT,
  WIDTH,
  createTextLayer,
  createBackground,
  getRandomColorPalette,
  getRandomFont,
} from 'lib'
import { fonts } from 'data'

export default function App() {
  const canvasRef = useRef()
  const finalCanvas = useRef()
  const downloadRef = useRef()
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

  const regenerate = () => {
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

  const download = () => {
    downloadCanvas()
  }

  function zoom(width) {
    const scale = width / canvas.getWidth()
    const height = scale * canvas.getHeight()

    canvas.setDimensions({
      width: width,
      height: height,
    })

    canvas.calcOffset()
    const objects = canvas.getObjects()
    for (const i in objects) {
      const scaleX = objects[i].scaleX
      const scaleY = objects[i].scaleY
      const left = objects[i].left
      const top = objects[i].top

      objects[i].scaleX = scaleX * scale
      objects[i].scaleY = scaleY * scale
      objects[i].left = left * scale
      objects[i].top = top * scale

      objects[i].setCoords()
    }
    canvas.renderAll()
  }
  const downloadCanvas = () => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = function (event) {
      canvas.discardActiveObject().renderAll()
      // console.log("loadin");
      try {
        setLoading(true)

        zoom(3000)
        setTimeout(() => {
          const canvasEl = canvas.wrapperEl.childNodes[0]
          const big = finalCanvas.current
          const ctx = big.getContext('2d')
          ctx.drawImage(canvasEl, 0, 0, 3000, 3000)
          big.toBlobHD((blob) => {
            const objurl = URL.createObjectURL(blob)
            downloadRef.current.href = objurl
            downloadRef.current.download = 'artwork.png'
            downloadRef.current.setAttribute('download', 'final_artwork.png')
            downloadRef.current.click()
            downloadRef.current.href = '#'
            // console.log(downloadRef.current);
            setLoading(false)
            zoom(600)
          })
        }, 1000)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
    image.src = 'https://i.chzbgr.com/maxW500/1691290368/h07F7F378/'
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
        <div className='bg-black' style={{ width: WIDTH, height: HEIGHT }}>
          <canvas
            id='canvas'
            className='w-full h-full relative '
            ref={canvasRef}
          />
        </div>
        <div className='relative mt-8 w-full flex items-center justify-center'>
          <button
            className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
            onClick={regenerate}
          >
            <span className='relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
              Regenerate
            </span>
          </button>
          <a ref={downloadRef} href='#' data-tip data-for='download'>
            <button
              type='button'
              className='text-white  bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              onClick={() => download()}
            >
              Download Artwork
              <svg
                aria-hidden='true'
                className='ml-2 -mr-1 w-5 h-5 inline-block'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </a>
        </div>
      </div>
      <div className='hidden'>
        <canvas
          id='final'
          height='3000px'
          width='3000px'
          crossOrigin='anonymous'
          ref={finalCanvas}
        ></canvas>
      </div>
    </>
  )
}
