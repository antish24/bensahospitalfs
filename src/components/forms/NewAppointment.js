'use client'
import { AlertContext } from '@/context/AlertContext'
import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import DepartmentList from '@/helper/Department.json'
import axios from 'axios'

const NewAppointmentForm = ({id}) => {
  const {openNotification}=useContext(AlertContext)
  const navigate=useRouter()
  const [loading,setLoading]=useState(false)
  const [nameloading,setnameLoading]=useState(false)

  const departmentOption=DepartmentList.map(d => ({
    value: d.name, 
    label: d.name
  }));

  const [depValue, setdepValue] = useState();
  const [physicianNames, setphysicianNames] = useState([]);

  const physicainNameOptions=physicianNames.map(d => ({
    value: d.IdNo, 
    label: d.fullName
  }));

  const handleDep = (value) => {
    setphysicianNames([])
    setdepValue(value);
  }


  const getPhysiciansName =async () => {
    setnameLoading(true)
    try {
      const res=await axios.get(`/api/physician/name/${depValue}`)
      setnameLoading(false)
      console.log(res.data.names)
      setphysicianNames(res.data.names);
    } catch (error) {
      setnameLoading(false)
      openNotification('error',error.response.data.message,3,'green');
    }
  };

  useEffect(()=>{
    getPhysiciansName()
  },[depValue])

  const onFinish =async (values) => {
    setLoading(true)
    console.log(id)
    try {
      const res=await axios.post(`/api/appointment/new`,{
        patientId:id,
        department:values.department,
        physician:values.physician,
        priority:values.priority,
        appointmentDate:values.appointmentDate,
        description:values.description,
      })
      setLoading(false)
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
        label="Department"
        rules={[
          {
            required: true,
            message: 'Please input Department',
          },
        ]}
        name="department"
      > 
      <Select
    showSearch
    onChange={handleDep}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={departmentOption}
  />
    </Form.Item>

    <Form.Item style={{margin:'5px'}}
        label="Physician"
        rules={[
          {
            required: true,
            message: 'Please input Physician',
          },
        ]}
      name="physician"
      > 
      <Select
      loading={nameloading}
    showSearch
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={physicainNameOptions}
  />
    </Form.Item>
<div style={{display:'flex',justifyContent:'space-between'}}>
      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Priority"
        name="priority"
        rules={[
          {
            required: true,
            message: 'Please input Priority',
          },
        ]}
      >
         <Select
    placeholder="Search to Select"
    required={true}
    options={[
      {
        value: 'High',
        label: 'High',},
        {
          value: 'Mid',
          label: 'Mid',},
          {
            value: 'Normal',
            label: 'Normal',},
      ]}
        /> 
      </Form.Item>

      <Form.Item style={{margin:'5px',width:'48%'}}
        label="Appointment Date"
        rules={[
          {
            required: true,
            message: 'Please input Date',
          },
        ]}
        name="appointmentDate"    
      >
        <Input  type='date'/>
      </Form.Item>
      </div>
      <Form.Item style={{margin:'5px'}}
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please input Description',
          },
        ]}
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