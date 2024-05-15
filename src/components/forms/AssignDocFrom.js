'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Select} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';

const AssignDocForm = () => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`/api/patient/assigndoc`, {
        patientId:'jj',
        priority:values.priority,
        department:values.department,
        physician:values.physician,
      });
      setLoading (false);
      openNotification ('error', res.data.message, 3, 'green');
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoading (false);
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
      autoComplete="on"
      autoFocus="true"
    >
      <Form.Item
        style={{margin: '5px'}}
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
          options={[
            {
              value: 'High',
              label: 'High',
            },
            {
              value: 'Mid',
              label: 'Mid',
            },
            {
              value: 'Normal',
              label: 'Normal',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Department"
        name="department"
        rules={[
          {
            required: true,
            message: 'Please input Department',
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
            {
              value: 'Ashy',
              label: 'Ashy',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Physician"
        name="physician"
        rules={[
          {
            required: true,
            message: 'Please input Physician',
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
            {
              value: 'Ashy',
              label: 'Ashy',
            },
          ]}
        />
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssignDocForm;
