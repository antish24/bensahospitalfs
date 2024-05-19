'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Input, Select, TimePicker} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useRouter} from 'next/navigation';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';

const NewPhAppointmentForm = ({id}) => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);

  const onFinish = async values => {
    setLoading (true);
    console.log (id);
    try {
      const res = await axios.post (`/api/appointment/new`, {
        patientId: id,
        department: '',
        physician:localStorage.getItem ('BHPFMS_IdNo'),
        priority: values.priority,
        appointmentDate: values.appointmentDate,
        startTime:values.startTime,
        duration:values.duration,
        description: values.description,
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

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Form.Item
          style={{margin: '5px', width: '48%'}}
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
          style={{margin: '5px', width: '48%'}}
          label="Appointment Date"
          rules={[
            {
              required: true,
              message: 'Please input Date',
            },
          ]}
          name="appointmentDate"
        >
          <Input type="date" />
        </Form.Item>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Form.Item
          label="Start Time"
          style={{margin: '5px', width: '48%'}}
          name="startTime"
          rules={[
            {
              required: true,
              message: 'Please select start time',
            },
          ]}
        >
          <TimePicker style={{width:'100%'}}/>
        </Form.Item>

        <Form.Item
          label="Duration"
          style={{margin: '5px', width: '48%'}}
          name="duration"
          rules={[
            {
              required: true,
              message: 'Please select Duration',
            },
          ]}
        >
          <TimePicker style={{width:'100%'}}/>
        </Form.Item>
      </div>

      <Form.Item
        style={{margin: '5px'}}
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

export default NewPhAppointmentForm;
