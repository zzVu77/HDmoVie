import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Home = () => {
  const navigate = useNavigate()
  //const [userProfile, setUserProfile] = useState(null)

  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')

      const response = await axios.get('http://localhost:3001/api/registeredusers/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // để gửi cookie refresh token
      })

      // Nếu server gửi token mới sau khi refresh
      const newAccessToken = response.headers['x-access-token']
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken)
      }
      if (!accessToken) {
        navigate('/login')
      }
      toast.success('Profile fetched successfully')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error('Session expired or invalid token. Please login again.')
          navigate('/login')
        } else {
          toast.error('Failed to fetch profile')
        }
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      fetchUserProfile()
    }
  }, [])

  return (
    <div className='mx-auto text-center flex item justify-center'>
      <div className='w-auto flex gap-10 p-10'>
        <a href='/home'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              Home
            </Text>
          </Button>
        </a>
        <a href='/about'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              About
            </Text>
          </Button>
        </a>
        <a href='/login'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              Login
            </Text>
          </Button>
        </a>
        <a href='/test'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              Test component
            </Text>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Home
