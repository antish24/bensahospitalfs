'use client'
import { Button, Form, Input, Select } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import axios from 'axios'

const Landing = () => {

  const navigate=useRouter()
  const [loading,setLoading]=useState(false)
  const onFinish =async (values) => {
    setLoading(true)
    try {
      const res=await axios.post(`/api/auth/login`,{email:values.email,password:values.password,role:values.role})
      setLoading(false)
      localStorage.setItem('HFS_Token',res.data.token)
      navigate.push(values.role)
    } catch (error) {
      alert( error.response.data.message);
      setLoading(false)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.box}>
      <div className={styles.loginform}>
        <h2>Wellcome Staff</h2>
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
        value: 'bedmanger',
        label: 'Bed Manager',
      },
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
        value: 'systemadmin',
        label: 'System Admin',
      },
      {
        value: 'ceomanagement',
        label: 'CEO Manager',
      },
      {
        value: 'patient',
        label: 'Patient',
      },
    ]}
  />
    </Form.Item>
    <Link style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}} href="/forgotpassword">Forgot Password?</Link>
    <Form.Item
    style={{display:'flex',justifyContent:'center',margin:'5px 0'}}
    >
      <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
        Login
      </Button>
    </Form.Item>
  </Form>
      </div>
    </div>
  )
}

export default Landing