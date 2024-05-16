'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Input, Select} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';
import DepartmentList from '@/helper/Department.json'

const NewUserForm = ({openModalFun}) => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);

  const [roleValue, setRoleValue] = useState();

  const handleRole = (value) => {
    setRoleValue(value);
  }

  let departmentOption =[] 
  if(roleValue==='physicians'){
    departmentOption=DepartmentList.map(d => ({
      value: d.name, 
      label: d.name
    }));
  }

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`/api/admin/newuser`, {
        email: values.email,
        phone: values.phone,
        sex: values.sex,
        fullName: values.fullName,
        role: values.role,
        department: values.department,
      });
      setLoading (false);
      openModalFun(false)
      openNotification ('success', res.data.message, 3, 'green');
    } catch (error) {
      setLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };
  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        style={{margin: '5px'}}
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

      <div style={{display: 'flex', justifyContent: 'space-between'}}>

      <Form.Item
          style={{margin: '5px', width: '48%'}}
          label="Gender"
          name="sex"
          rules={[
            {
              required: true,
              message: 'Please input Gender',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
            ]}
          />
        </Form.Item>
        
        <Form.Item
          style={{margin: '5px', width: '48%'}}
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please input Role',
            },
          ]}
          name="role"
        >
          <Select
            showSearch
            onChange={handleRole}
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
            ]}
          />
        </Form.Item>

        {
          roleValue==='physicians'&&<Form.Item
          style={{margin: '5px', width: '48%'}}
          label="Department"
          name="department"
          rules={[
            {
              required: roleValue==='physicians',
              message: 'Please input Department',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={departmentOption}
          />
        </Form.Item>
        }

      </div>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input phone',
          },
        ]}
        name="phone"
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{margin: '5px'}}
        rules={[
          {
            required: true,
            type:'email',
            message: 'Please input your email!',
          },
        ]}
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
