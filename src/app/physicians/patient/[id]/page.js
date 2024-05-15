'use client'
import React, { useContext, useEffect, useState } from 'react';
import {Badge, Button, Descriptions, Form, Input, Select, Tabs} from 'antd';
import ModalForm from '@/components/modal/Modal';
import NewAppointmentForm from '@/components/forms/NewAppointment';
import { AlertContext } from '@/context/AlertContext';
import axios from 'axios';
import NewPrescriptionForm from '@/components/forms/NewPrescriptionForm';
import NewDiagnosticForm from '@/components/forms/NewDiagnosticRequest';
import VitalsTab from '@/components/tabs/VitalsTab';

const PatientDetailPhysician = () => {
  const [patientData,setPatientData]=useState([])

  const getPatientData=async()=>{
    try {
      const res=await axios.get('/api/patient/details/MFP-0001')
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
    <div>
        <Button style={{marginRight:'10px'}} onClick={() =>{setModalContentTitle('Treatment');setOpenModal (true);setModalContent(<NewAppointmentForm/>)}}>Treatment</Button>
        <Button style={{marginRight:'10px'}} onClick={() =>{setModalContentTitle('Bed Request');setOpenModal (true);setModalContent(<NewAppointmentForm/>)}}>Bed Request</Button>
        <Button style={{marginRight:'10px'}} onClick={() =>{setModalContentTitle('Diagnostic');setOpenModal (true);setModalContent(<NewDiagnosticForm/>)}}>Diagnostic</Button>
        <Button style={{marginRight:'10px'}} onClick={() =>{setModalContentTitle('Prescription');setOpenModal (true);setModalContent(<NewPrescriptionForm/>)}}>Prescription</Button>
        <Button onClick={() => {setModalContentTitle('Appointment');setOpenModal (true);setModalContent(<NewAppointmentForm/>)}}>Set Appointment</Button></div>
    </div>
<div style={{display:"flex",justifyContent:'space-between'}}>
    <Form
      layout="vertical"
      style={{width:'35%'}}
      initialValues={patientData}
    >
      <h3>Personal Info</h3>
      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
        name="fullName"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Sex"
        name="sex"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Date Of Birth"
        name="dateOfBirth"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Blood Type"
        name="bloodType"
      >
        <Input disabled/>
      </Form.Item>
      </div>

      <h3 style={{margin:'10px 0 0 0'}}>Contact Info</h3>

      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        name="phone"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Email"
        name="email"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
        label="City"
        name="city"
      > 
      <Input disabled/>
    </Form.Item>

    <Form.Item style={{margin:'5px'}}
        label="Address"
        name="address"
      > 
      <Input disabled/>
    </Form.Item>
      </div>

      <h3 style={{margin:'10px 0 0 0'}}>Emergency Contact</h3>

      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
        name="emergencyContactName"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        name="emergencyContactPhone"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item style={{margin:'5px'}}
        label="Relationship"
        name="relationship"

      >
        <Input disabled/>
      </Form.Item>
      
      </div>

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
export default PatientDetailPhysician;