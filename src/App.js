import { useLayoutEffect, useState, useRef } from 'react'
import { fabric } from 'fabric'
import WF from 'webfontloader'
import 'canvas-toBlob/canvas-toBlob'

import { useCanvas } from 'context/CanvasContext'
import { Spinner } from 'components'
import {
  createTextLayer,
  createBackground,
  getRandomColorPalette,
  getRandomFont,
} from 'lib'
import { fonts, BACKGROUND_COLOR, HEIGHT, WIDTH, OUTPUT_SIZE } from 'data'

export default function App() {
  const canvasRef = useRef()
  const finalCanvas = useRef()
  const downloadRef = useRef()
  const {
    canvas,
    setCanvas,
    canvas2,
    setCanvas2,
    setLoading,
    isLoading,
    fontFamily,
    setFontFamily,
  } = useCanvas()
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

    const canvas2 = new fabric.Canvas('can')
    setCanvas2(canvas2)
  }, [])
  useLayoutEffect(() => {
    setLoading(true)
    const list = fonts.map((item) => item.value)
    WF.load({
      google: {
        families: list,
      },
      classes: false,
      active: () => {
        sessionStorage.fonts = true
        setLoading(false)
        // console.clear();
      },
    })
  }, [])

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value)
  }
  const regenerate = () => {
    if (keyword === '') return
    setLoading(true)
    let kw = keyword
    kw = kw[0].toUpperCase() + kw.substring(1)
    const palette = getRandomColorPalette()
    const font = getRandomFont().name

    setFontFamily(font)
    createTextLayer(canvas, canvas2, kw, fabric, palette, font)
    createBackground(canvasRef.current, canvas, fabric, palette)
    setLoading(false)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      regenerate()
    }
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
    // eslint-disable-next-line no-unused-vars
    image.onload = function (event) {
      canvas.discardActiveObject().renderAll()
      // console.log("loadin");
      setLoading(true)
      try {
        zoom(OUTPUT_SIZE)
        setTimeout(() => {
          const canvasEl = canvas.wrapperEl.childNodes[0]
          const big = finalCanvas.current
          big.style.opacity = 0
          const ctx = big.getContext('2d')
          ctx.drawImage(canvasEl, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)
          big.toBlobHD((blob) => {
            const objurl = URL.createObjectURL(blob)
            downloadRef.current.href = objurl
            downloadRef.current.download = 'artwork.jpg'
            downloadRef.current.setAttribute('download', 'final_artwork.jpg')
            downloadRef.current.click()
            downloadRef.current.href = '#'
            // console.log(downloadRef.current);
            console.log('inside download')
            setLoading(false)
            zoom(600)
          })
        }, 1200)
        console.log('outside')
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    image.src =
      'https://upload.wikimedia.org/wikipedia/commons/f/f8/Fulmer_Falls_Closeup_3000px.jpg'
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
        <div className='relative mt-8 w-full flex items-center justify-between'>
          <p className='text-xs text-gray-700 dark:text-gray-400 mr-4 capitalize'>
            main font: {fontFamily}
          </p>
          <div>
            <button
              className={[
                'relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500',
                'group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800',
                isLoading ? 'pointer-events-none' : 'pointer-events-auto',
              ].join(' ')}
              onClick={regenerate}
            >
              <span className='relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center'>
                Regenerate
                <span className='ml-4'>
                  {isLoading && <Spinner type='dark' />}
                </span>
              </span>
            </button>

            <a ref={downloadRef} href='#' data-tip data-for='download'>
              <button
                type='button'
                className='text-white  bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
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
      </div>
      <div className='hidden'>
        <canvas
          id='c'
          // eslint-disable-next-line react/no-unknown-property
          crossOrigin='anonymous'
        ></canvas>
      </div>
      <div className='hidden'>
        <canvas
          id='final'
          height={OUTPUT_SIZE}
          width={OUTPUT_SIZE}
          // eslint-disable-next-line react/no-unknown-property
          crossOrigin='anonymous'
          ref={finalCanvas}
        ></canvas>
      </div>
    </>
  )
}
