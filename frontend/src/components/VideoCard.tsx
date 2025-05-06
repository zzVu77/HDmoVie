const VideoCard = () => {
  return (
    <div className='w-full mx-auto px-10'>
      <iframe
        className='mx-auto w-full h-[85vh] object-contain rounded-xl'
        src='https://www.youtube.com/embed/DHlXDqo7VsU'
        title='Trailer'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoCard
