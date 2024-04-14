import React from 'react'
import ClientNavbar from '../../Components/Clients/ClientNavbar'
import ClientCard from '../../Components/Clients/ClientCard'
import ClientHash from '../../Components/Clients/ClientHash'
import ClientPosts from '../../Components/Clients/ClientPosts'


function PainterHome() {
  return (
    <div className=''>

      <div>
       <ClientNavbar />
      </div>


        <div className="fixed flex-initial w-full sm:w-96 bg-blue-500 h-screen  mt-14">
          <ClientCard />
          <ClientHash />
        </div>

        <div className="flex-1 bg-green-500">
          <ClientPosts />
        </div>

    </div>
  )
}

export default PainterHome