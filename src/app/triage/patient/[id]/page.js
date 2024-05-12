'use client'
import React, { useContext, useState } from 'react';
import {Badge, Button, Descriptions, Form, Input, Select, Tabs} from 'antd';
import ModalForm from '@/components/modal/Modal';
import NewAppointmentForm from '@/components/forms/NewAppointment';
import NewVitalsForm from '@/components/forms/NewVitals';
import { AlertContext } from '@/context/AlertContext';
import axios from 'axios';

const PatientDetail = () => {
 
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);

  const items = [
    {
      key: '1',
      label: 'Vitals',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Medical History',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Treament',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Medications',
      children: 'Content of Tab Pane 4',
    },
    {
      key: '5',
      label: 'Lab and test results',
      children: 'Content of Tab Pane 5',
    },
    {
      key: '6',
      label: 'Patient Log',
      children: 'Content of Tab Pane 6',
    },
  ];

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
  const [openVitals, setOpenVitals] = useState(false);
  const [openAppointment, setOpenAppointment] = useState(false);

  return(
    <>
    <ModalForm
      open={openVitals}
      close={() => setOpenVitals (false)}
      title={'Record Vitals'}
      content={<NewVitalsForm />}
    />
    <ModalForm
      open={openAppointment}
      close={() => setOpenAppointment (false)}
      title={'Set Appointment'}
      content={<NewAppointmentForm />}
    />

    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div>Registerd Date:23/03/2001   <Badge status='success' text="Active"/></div>
    <div><Button style={{marginRight:'10px'}} onClick={() => setOpenVitals (true)}>Vitals</Button>
    <Button onClick={() => setOpenAppointment (true)}>Set Appointment</Button></div>
    </div>
<div style={{display:"flex",justifyContent:'space-between'}}>
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      autoFocus="true"
      style={{width:'35%'}}
    >
      <h3 style={{margin:'10px 0 0 0'}}>Personal Info</h3>
      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
        required={true}
        name="fullName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Sex"
        required={true}
        name="sex"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Date Of Birth"
        required={true}
        name="dateOfBirth"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Blood Type"
        required={true}
        name="bloodType"
      >
        <Input />
      </Form.Item>
      </div>

      <h3 style={{margin:'10px 0 0 0'}}>Contact Info</h3>

      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        required={true}
        name="phone"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Email"
        required={true}
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
        label="City"
        required={true}
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

    <Form.Item style={{margin:'5px'}}
        label="Sub City"
        required={true}
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

      <h3 style={{margin:'10px 0 0 0'}}>Emergency Contact</h3>

      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
        required={true}
        name="emergencyContactName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        required={true}
        name="emergencyContactPhone"
      >
        <Input />
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
        label="Relationship"
        name="emergencyContactRelationship"
        required={true}

      >
         <Select
    placeholder="Search to Select"
    required={true}
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
        style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
      >
        <Button
          type='default'
          style={{marginRight:'10px'}}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
    <div style={{width:'63%',display:'flex',flexDirection:'column',gap:'10px',height:"70vh",overflow:'scroll'}}>
    <Tabs
        defaultActiveKey="1"
        items={items}
        indicator={{
          size: (origin) => origin - 20,
        }}
      />
    </div>
    </div>
    </>
  )
}
export default PatientDetail;