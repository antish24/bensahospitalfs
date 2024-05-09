'use client'
import { Button} from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const PageNotFound = () => {
    const navigate=useRouter()
  return (
    <div>PageNotFound
        <Button onClick={()=>navigate.replace('/')}>Go To Home Page</Button>
    </div>
  )
}

export default PageNotFound