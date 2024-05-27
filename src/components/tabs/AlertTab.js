'use client'
import { Empty,Card, Alert } from 'antd'
import React from 'react'
import { IoAlertCircle } from 'react-icons/io5'

const AlertTab = () => {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'2px',width:'100%',height:'380px',overflow:'scroll'}}>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Alert message="Invalid Password" type="error" showIcon description='kjgkljhkjhkj'/>
      <Alert message="New Appointment" type="success" showIcon description=''/>
      <Empty image={<IoAlertCircle size={60}/>} description='No Alert Messages'/>
    </div>
  )
}

export default AlertTab