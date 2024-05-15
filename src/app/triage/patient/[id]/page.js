'use client'
import React, { useContext, useEffect, useState } from 'react';
import {Badge, Button, Descriptions, Form, Input, Select, Tabs} from 'antd';
import ModalForm from '@/components/modal/Modal';
import NewAppointmentForm from '@/components/forms/NewAppointment';
import NewVitalsForm from '@/components/forms/NewVitals';
import { AlertContext } from '@/context/AlertContext';
import axios from 'axios';
import VitalsTab from '@/components/tabs/VitalsTab';
import AssignDocForm from '@/components/forms/AssignDocFrom';
import { useParams } from 'next/navigation';

const PatientDetail = () => {
 
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);

  const [patientData,setPatientData]=useState([])
  const{id}=useParams()
  const getPatientData=async()=>{
    try {
      const res=await axios.get(`/api/patient/details/${id}`)
      setPatientData(res.data.patient)
      console.log(res.data.patient)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPatientData()
  },[])

  const items = [
    {
      key: '1',
      label: 'Vitals',
      children: <VitalsTab/>,
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
      const res = await axios.post (`/api/patient/details`, {
      IdNo:id,
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
      });
      setLoading (false);
      openNotification ('sucess', res.data.message, 3, 'green');
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  };
  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalContentTitle, setModalContentTitle] = useState('');

  return(
    <>
    <ModalForm
      open={openModal}
      close={() => setOpenModal (false)}
      title={modalContentTitle}
      content={modalContent}
    />

    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div>Registerd Date:23/03/2001   <Badge status='success' text="Active"/></div>
    <div style={{display:'flex',gap:'10px'}}>
      <Button onClick={() =>{setModalContentTitle('Update Status');setOpenModal (true);setModalContent(<NewAppointmentForm/>)}}>Update Status</Button>
      <Button onClick={() =>{setModalContentTitle('Assign Physician');setOpenModal (true);setModalContent(<AssignDocForm/>)}}>Assign</Button>
      <Button onClick={() =>{setModalContentTitle('Wirte Vitals');setOpenModal (true);setModalContent(<NewVitalsForm/>)}}>Vitals</Button>
      <Button onClick={() =>{setModalContentTitle('Set Appointment');setOpenModal (true);setModalContent(<NewAppointmentForm/>)}}>Set Appointment</Button>
    </div>
    </div>
<div style={{display:"flex",justifyContent:'space-between'}}>
    {Object.keys(patientData).length > 0 ? (
      <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={patientData}
      disabled={loading}
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
      <Form.Item
        style={{margin: '5px'}}
        label="Sex"
        rules={[
          {
            required: true,
            message: 'Please input Sex',
          },
        ]}
        name="sex"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Date Of Birth"
        rules={[
          {
            required: true,
            message: 'Please input DOB',
          },
        ]}
        name="dateOfBirth"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Blood Type"
        rules={[
          {
            required: true,
            message: 'Please input Type',
          },
        ]}
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
      <Form.Item
        style={{margin: '5px'}}
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input Email',
            type:'email'
          },
        ]}
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
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

    <Form.Item style={{margin:'5px'}}
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

      <h3 style={{margin:'10px 0 0 0'}}>Emergency Contact</h3>

      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
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
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input Contact',
          },
        ]}
        name="emergencyContactPhone"
      >
        <Input />
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
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
    ) : (
      <p>Loading patient data...</p>
    )}
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