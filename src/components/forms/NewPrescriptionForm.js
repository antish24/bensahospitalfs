'use client';
import {AlertContext} from '@/context/AlertContext';
import {Button, Form, Input, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';

const NewPrescriptionForm = ({id}) => {
  const {openNotification} = useContext (AlertContext);
  const navigate = useRouter ();
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const [medications, setMedications] = useState ([
    {
      name: '',
      strength: '',
      dosage: '',
      instruction: '',
      quantity: '',
    },
  ]);

  const handleAdd = () => {
    setMedications ([
      ...medications,
      {
        name: '',
        strength: '',
        dosage: '',
        instruction: '',
        quantity: '',
      },
    ]);
  };

  const handleRemove = index => {
    setMedications (medications.filter ((_, i) => i !== index));
  };

  const onFinish = async () => {
    setLoading (true);
    console.log(id)
    try {
      const res = await axios.post (`/api/prescription/new`, {
        patientId:id,
        physicianId:localStorage.getItem ('BHPFMS_IdNo'),
        medications:medications
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
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {medications.map ((medication, index) => (
        <Form.Item label={`Medication ${index + 1}`} key={index} rules={[
          {
            required: true,
            message: `Details required`,
          },
        ]}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '5px',
              marginBottom: '5px',
            }}
          >
            <Input
              placeholder="Name"
              value={medication.name}
              onChange={e => {
                const value = e.target.value;
                setMedications (prevMedications => {
                  const updatedMedications = [...prevMedications];
                  updatedMedications[index].name = value;
                  return updatedMedications;
                });
              }}
            />

            <Input
              placeholder="Strength"
              value={medication.strength}
              onChange={e => {
                const value = e.target.value;
                setMedications (prevMedications => {
                  const updatedMedications = [...prevMedications];
                  updatedMedications[index].strength = value;
                  return updatedMedications;
                });
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '5px',
              marginBottom: '5px',
            }}
          >

            <Input
              placeholder="Dosage"
              value={medication.dosage}
              onChange={e => {
                const value = e.target.value;
                setMedications (prevMedications => {
                  const updatedMedications = [...prevMedications];
                  updatedMedications[index].dosage = value;
                  return updatedMedications;
                });
              }}
            />
            <Input
              placeholder="Quantity"
              value={medication.quantity}
              onChange={e => {
                const value = e.target.value;
                setMedications (prevMedications => {
                  const updatedMedications = [...prevMedications];
                  updatedMedications[index].quantity = value;
                  return updatedMedications;
                });
              }}
            />
          </div>

          <TextArea
            placeholder="Instruction"
            value={medication.instruction}
            onChange={e => {
              const value = e.target.value;
              setMedications (prevMedications => {
                const updatedMedications = [...prevMedications];
                updatedMedications[index].instruction = value;
                return updatedMedications;
              });
            }}
          />
          {index > 0 &&
            <Button type="dashed" onClick={() => handleRemove (index)}>
              Remove
            </Button>}

        </Form.Item>
      ))}

      <Button type="dashed" onClick={handleAdd}>
        Add Medication
      </Button>
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

export default NewPrescriptionForm;
