import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

const Admin = () => {
  return (
    <div className='bg-white'>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </div>
  )
}

export default Admin
