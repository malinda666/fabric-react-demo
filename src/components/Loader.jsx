const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50' />
  ) : (
    <div />
  )
}

export default Loader
