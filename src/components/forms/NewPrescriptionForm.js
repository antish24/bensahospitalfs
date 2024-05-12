'use client';
import { AlertContext } from '@/context/AlertContext';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

const NewPrescriptionForm = () => {
const { openNotification } = useContext(AlertContext);
const navigate = useRouter();
const [loading, setLoading] = useState(false);
const [form] = Form.useForm();

const [medications, setMedications] = useState([
{
name: '',
strength: '',
dosage: '',
instruction: '',
quantity: '',
specialInstruction: ''
}
]);

const handleAdd = () => {
setMedications([...medications, {
name: '',
strength: '',
dosage: '',
instruction: '',
quantity: '',
specialInstruction: ''
}])
}

const handleRemove = (index) => {
setMedications(medications.filter((_, i) => i !== index))
}
return (
    <Form form={form}
    layout="vertical"
    >
        {medications.map((medication, index) => (

<Form.Item
  label={`Medication ${index + 1}`}
  key={index}
>

  <Input
    placeholder="Name"
    value={medication.name}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].name = value;
        return updatedMedications;
      });
    }}
  />

  <Input
    placeholder="Strength"
    value={medication.strength}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].strength = value;
        return updatedMedications;
      });
    }}
  />

  <Input
    placeholder="Dosage"
    value={medication.dosage}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].dosage = value;
        return updatedMedications;
      });
    }}
  />

  <TextArea
    placeholder="Instruction"
    value={medication.instruction}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].instruction = value;
        return updatedMedications;
      });
    }}
  />

  <Input
    placeholder="Quantity"
    value={medication.quantity}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].quantity = value;
        return updatedMedications;
      });
    }}
  />

  <TextArea
    placeholder="Special Instruction"
    value={medication.specialInstruction}
    onChange={(e) => {
      const value = e.target.value;
      setMedications(prevMedications => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].specialInstruction = value;
        return updatedMedications;
      });
    }}
  />

  {index > 0 && (
    <Button
      type="dashed"
      onClick={() => handleRemove(index)}
    >
      Remove
    </Button>
  )}

</Form.Item>

))}

<Button
type="dashed"
onClick={handleAdd}
>
Add Medication
</Button>

</Form>
);
};

export default NewPrescriptionForm;