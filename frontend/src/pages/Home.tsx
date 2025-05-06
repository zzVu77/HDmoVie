const Home = () => {
  return (
    <div className='mx-auto text-center flex justify-center'>
      <div className='w-auto'>
        <a href='/home'>
          <li className='w-fit'>Home</li>
        </a>
        <a href='/about'>
          <li className='w-fit'>About</li>
        </a>
        <a href='/login'>
          <li className='w-fit'>Login</li>
        </a>
      </div>
    </div>
  )
}

export default Home
