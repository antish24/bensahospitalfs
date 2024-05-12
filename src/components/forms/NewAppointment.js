'use client'
import { AlertContext } from '@/context/AlertContext'
import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const NewAppointmentForm = () => {
  const {openNotification}=useContext(AlertContext)
  const navigate=useRouter()
  const [loading,setLoading]=useState(false)

  const onFinish =async (values) => {
    setLoading(true)
    try {
      const res=await axios.post(`/api/patient/newappointment`,{email:values.email,password:values.password,role:values.role})
      setLoading(false)
      openNotification('error','good',3,'red');
    } catch (error) {
      openNotification('error','error.response.data.message',3,'red');
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
        label="Department"
        required={true}
        name="department"
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

    <Form.Item style={{margin:'5px'}}
        label="Physician"
        required={true}
        name="physician"
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
<div style={{display:'flex',justifyContent:'space-between'}}>
      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Priorty"
        name="priorty"
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
        label="Appointment Date"
        required={true}
        name="appointmentDate"    
      >
        <Input  type='date'/>
      </Form.Item>
      </div>
      <Form.Item style={{margin:'5px'}}
        label="Description"
        required={true}
        name="description"  
      >
        <TextArea />
      </Form.Item>

      <Form.Item
    style={{display:'flex',justifyContent:'center',marginTop:'15px'}}
    >
      <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
        Submit
      </Button>
    </Form.Item>
    </Form>
  )
}

export default NewAppointmentForm