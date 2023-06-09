import React from 'react'
import List from '../../components/List/List'
import SideBar from '../../components/SideBar/SideBar'

function HomePage() {
  return (
    <div className='grid grid-cols-8'>
      <div className='col-span-2'>
      <SideBar/>
      </div>
      <div className='col-span-6'>
      <List/>
      </div>
    </div>
  )
}

export default HomePage