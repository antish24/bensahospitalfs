'use client'
import React, { useContext, useState } from 'react';
import {Badge, Button, Descriptions, Form, Input, Select, Tabs} from 'antd';
import ModalForm from '@/components/modal/Modal';
import NewAppointmentForm from '@/components/forms/NewAppointment';
import NewVitalsForm from '@/components/forms/NewVitals';
import { AlertContext } from '@/context/AlertContext';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
const UsersDetail = () => {
 
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const params=useParams()
  const navigate=useRouter()

  const items = [
    {
      key: '5',
      label: 'Data',
      children: 'Content of Tab Pane 5',
    },
    {
      key: '6',
      label: 'User Log',
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

  const [loadingDelete,setLoadingDelete] = useState(false);
  const [loadingBan,setLoadingBan] = useState(false);

  const DeleteUser=async()=>{
    setLoadingDelete(true)
    try {
      const res=await axios.post('/api/admin/deleteuser',{IdNo:params.id})
      setLoadingDelete(false)
      navigate.replace('/systemadmin/users')
      openNotification('success',res.data.message,3,'green')
    } catch (error) {
      setLoadingDelete(false)
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  }

  const BanUser=async()=>{
    setLoadingBan(true)
    try {
      const res=await axios.post('/api/admin/banuser',{IdNo:params.id})
      setLoadingBan(false)
      navigate.replace('/systemadmin/users')
      openNotification('success',res.data.message,3,'green')
    } catch (error) {
      setLoadingBan(false)
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  }

  return(
    <>
    <ModalForm
      open={openModal}
      close={() => setOpenModal (false)}
      title={modalContentTitle}
      content={modalContent}
    />

    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div>Registerd Date:23/03/2001  <Badge status='success' text="Active"/></div>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <Button disabled={loadingDelete} loading={loadingDelete} onClick={()=>DeleteUser()}>Delete</Button>
        <Button disabled={loadingBan} loading={loadingBan} onClick={()=>BanUser()}>Ban</Button>
        <Button style={{marginRight:'10px'}} onClick={() =>{setModalContentTitle('Change User Password');setOpenModal (true);setModalContent(<div>ok</div>)}}>Change Password</Button>
    </div>
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
        label="Address"
        required={true}
        name="address"
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
        name="relationship"
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
export default UsersDetail;