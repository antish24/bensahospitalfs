'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Input, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';

const NewVitalsForm = () => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`/api/patient/writevitals`, {
        patientId:'jj',
      complaint:values.complaint,
      medicalHistory:values.medicalHistory,
      symptoms:values.symptoms,
      symptomSeverity:values.severity,
      vitalsSigns:values.vitalSign,
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
        label="Complaint"
        rules={[
          {
            required: true,
            message: 'Please input Complaint',
          },
        ]}
        name="complaint"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Symptoms"
        rules={[
          {
            required: true,
            message: 'Please input Symptoms',
          },
        ]}
        name="symptoms"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Medical history"
        rules={[
          {
            required: true,
            message: 'Please input Medical',
          },
        ]}
        name="medicalHistory"
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        style={{margin: '5px'}}
        label="Symptom severity"
        name="severity"
        rules={[
          {
            required: true,
            message: 'Please input severity',
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
        label="Vitals Signs"
        rules={[
          {
            required: true,
            message: 'Please input Vitals',
          },
        ]}
        name="vitalSign"
      >
        <TextArea />
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

export default NewVitalsForm;
