import DashboardComponent from '@/src/components/dashboard/DashboardComponent'

export const metadata = {
  title: "KOSH | Dashboard",
};

const Dashboard = () => {
  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-8'>
      <DashboardComponent />
    </div>
  )
}

export default Dashboard
