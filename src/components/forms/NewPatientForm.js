'use client'
import { AlertContext } from '@/context/AlertContext'
import { Button, Form, Input, Select } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const NewPatientForm = ({modalOpen}) => {
  const {openNotification}=useContext(AlertContext)
  const navigate=useRouter()
  const [loading,setLoading]=useState(false)

  const onFinish =async (values) => {
    setLoading(true)
    try {
      const res=await axios.post(`/api/patient/new`,{
      fullName:values.fullName,
      sex:values.sex,
      dateOfBirth:values.dateOfBirth,
      bloodType:values.bloodType,
      email:values.email,
      phone:values.phone,
      city:values.city,
      subCity:values.subCity,
      emergencyContactName:values.emergencyContactName,
      emergencyContactPhone:values.emergencyContactPhone,
      emergencyContactRelationship:values.emergencyContactRelationship,
      })
      setLoading(false)
      modalOpen()
      openNotification('error',res.data.message,3,'green');
    } catch (error) {
      openNotification('error',error.response.data.message,3,'red');
      setLoading(false)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
    autoFocus='true'>
      <Form.Item style={{margin:'5px'}} 
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input Name',
          },
        ]}
        name="fullName"
      >
        <Input />
      </Form.Item>

<div style={{display:'flex',justifyContent:'space-between'}}>
<Form.Item style={{margin:'5px',width:'48%'}}
        label="City"
        rules={[
          {
            required: true,
            message: 'Please input City',
          },
        ]}
        name="city"
      > 
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

    <Form.Item style={{margin:'5px',width:'48%'}}
        label="Sub City"
        rules={[
          {
            required: true,
            message: 'Please input Sub City',
          },
        ]}
        name="subCity"
      > 
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
</div>
<div style={{display:'flex',justifyContent:'space-between'}}>
      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Gender"
        name="sex"
        required={true}

      >
         <Select
    placeholder="Search to Select"
    required={true}
    options={[
      {
        value: 'Male',
        label: 'Male',},
        {
          value: 'Female',
          label: 'Female',},
          {
            value: 'Ashy',
            label: 'Ashy',},
      ]}
        /> 
      </Form.Item>

      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Date of Birth"
        rules={[
          {
            required: true,
            type:'date',
            message: 'Please input Phone',
          },
        ]}
        name="dateOfBirth"    
      >
        <Input type='date'/>
      </Form.Item>
      </div>
      <Form.Item style={{margin:'5px'}}
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input Phone',
          },
        ]}
        name="phone"  
      >
        <Input />
      </Form.Item>

      <Form.Item style={{margin:'5px'}}
        label="Email"
        name="email"   
        rules={[
          {
            required: true,
            type:'email',
            message: 'Please input email',
          },
        ]} 
      >
        <Input />
      </Form.Item>
      <h3>Emergency Contact</h3>
      <Form.Item style={{margin:'5px'}} 
        label="Emergency Contact Name"
        rules={[
          {
            required: true,
            message: 'Please input Name',
          },
        ]}
        name="emergencyContactName"
      >
        <Input />
      </Form.Item>

      <div style={{display:'flex',justifyContent:'space-between'}}>
      <Form.Item style={{margin:'5px',width:"48%"}} 
        label="Emergency Contact Phone"
        rules={[
          {
            required: true,
            message: 'Please input phone',
          },
        ]}
        name="emergencyContactPhone"
      >
        <Input />
      </Form.Item>
      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Relationship"
        name="emergencyContactRelationship"
        rules={[
          {
            required: true,
            message: 'Please input Relationship',
          },
        ]}

      >
         <Select
    placeholder="Search to Select"
    options={[
      {
        value: 'parent',
        label: 'Parent',},
        {
          value: 'friend',
          label: 'Friend',},
          {
            value: 'childern',
            label: 'Children',},
      ]}
        /> 
      </Form.Item>
      </div>

      <Form.Item
    style={{display:'flex',justifyContent:'center',marginTop:'15px'}}
    >
      <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
        Register
      </Button>
    </Form.Item>
    </Form>
  )
}

export default NewPatientForm