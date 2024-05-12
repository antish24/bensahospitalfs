'use client'
import { Button} from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const PageNotFound = () => {
    const navigate=useRouter()
    const path=localStorage.getItem('BHPFMS_Role')
  return (
    <div>PageNotFound
        <Button onClick={()=>navigate.replace(`/${path}`)}>Go To Home Page</Button>
    </div>
  )
}

export default PageNotFound