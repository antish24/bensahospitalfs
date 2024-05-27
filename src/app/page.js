'use client'
import { Button, Form, Input, Select, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import axios from 'axios'
import { AlertContext } from '@/context/AlertContext'
import IsAuth from '@/helper/IsAuth'
import Image from 'next/image'
import loginpic from '../../public/imgs/login.svg'

const Landing = () => {
  const {openNotification}=useContext(AlertContext)
  const navigate=useRouter()
  const [loading,setLoading]=useState(false)
  const onFinish =async (values) => {
    setLoading(true)
    try {
      const res=await axios.post(`/api/auth/login`,{email:values.email,password:values.password,role:values.role})
      localStorage.setItem('BHPFMS_Token',res.data.token)
      localStorage.setItem('BHPFMS_IdNo',res.data.IdNo)
      localStorage.setItem('BHPFMS_Role',res.data.role)
      navigate.replace(values.role)
      openNotification('succes','Login Successfully',3,'green');
      setLoading(false)
    } catch (error) {
      openNotification('error',error.response.data.message,3,'red');
      setLoading(false)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.box}>
      <IsAuth path={'/'} setLoading={()=>console.log('loading')}/>
      <Image className={styles.loginform2} src={loginpic}/>
      <div className={styles.loginform}>
      <Tooltip placement="top" title={'Bensa Hospital Patient File Management System'}>
      <h2 style={{marginBottom:'50px'}}>Welcome to BHPFMS</h2>
          </Tooltip>
        <span style={{width:'70%',marginBottom:'10px'}}>login to your account</span>
        <Form
        layout="vertical"
    name="login"
    style={{
      width: '70%',
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
    autoFocus='true'
  >
    <Form.Item
      label="Email"
      name="email"
      style={{margin:'5px 0'}}
      rules={[
        {
          required: true,
          type:'email',
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      style={{margin:'5px 0'}}
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item 
    label="Role"
      style={{margin:'5px 0'}}
      name="role"
    rules={[
      {
        required: true,
        message: 'Please selecte role',
      },
    ]}>
    <Select
    showSearch
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'cashier',
        label: 'Cashier',
      },
      {
        value: 'pharmacy',
        label: 'Pharmacy',
      },
      {
        value: 'physicians',
        label: 'Physicians',
      },
      {
        value: 'triage',
        label: 'Triage',
      },
      {
        value: 'diagnosticservices',
        label: 'Diagnostic Services',
      },
      {
        value: 'administrators',
        label: 'Administrators',
      },
    ]}
  />
    </Form.Item>
    <Link style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}} href="/forgotpassword">Forgot Password?</Link>
    <Form.Item
    style={{display:'flex',justifyContent:'center',margin:'5px 0'}}
    >
      <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
      </div>
    </div>
  )
}

export default Landing