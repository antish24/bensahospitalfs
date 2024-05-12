'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Input, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';

const NewVitalsForm = () => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`/api/patient/newvitals`, {
        email: values.email,
        password: values.password,
        role: values.role,
      });
      setLoading (false);
      openNotification ('error', 'good', 3, 'red');
    } catch (error) {
      openNotification ('error', 'error.response.data.message', 3, 'red');
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
        label="Complaint"
        required={true}
        name="complaint"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Symptoms"
        required={true}
        name="symptoms"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Medical history"
        required={true}
        name="medicalhistory"
      >
        <Input />
      </Form.Item>
      
      <div style={{display:'flex'}}>
      <Form.Item
        style={{margin: '5px', width: '48%'}}
        label="Symptom severity"
        name="severity"
        required={true}
      >
        <Select
          placeholder="Search to Select"
          required={true}
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
        style={{margin: '5px', width: '48%'}}
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
      </div>

      <Form.Item
        style={{margin: '5px'}}
        label="Vitals Signs"
        required={true}
        name="vitalSign"
      >
        <TextArea />
      </Form.Item>

      <div style={{display:'flex'}}>
      <Form.Item
        style={{margin: '5px', width: '48%'}}
        label="Department"
        name="department"
        required={true}
      >
        <Select
          placeholder="Search to Select"
          required={true}
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
        style={{margin: '5px', width: '48%'}}
        label="Physician"
        name="physician"
        required={true}
      >
        <Select
          placeholder="Search to Select"
          required={true}
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
      </div>

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

export default NewVitalsForm;
