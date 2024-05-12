import { Form, Input, Button, Select } from 'antd';

const NewDiagnosticForm = () => {

  const [form] = Form.useForm();

  return (
    <Form form={form}
    layout="vertical"
    
    >

      <Form.Item
      style={{margin:'0'}}
        name="test"
        label="Test"  
      >
        <Select 
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
        ]}/>
      </Form.Item>

      <Form.Item
      style={{margin:'0'}}
        name="bodyPart"
        label="Body Part"
      >
        <Input />  
      </Form.Item>

      <Form.Item
      style={{margin:'0'}}
        name="reason"
        label="Reason"
      >
         <Input.TextArea />
      </Form.Item>

      <Form.Item
      style={{margin:'0'}}
        name="priority" 
        label="Priority"
      >
        <Select 
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
        ]}/>
      </Form.Item>

      <Form.Item
      style={{marginTop:'10px'}}
        name="instructions"
        label="Instructions"
      >
        <Input.TextArea />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit 
      </Button>

    </Form>
  )
}

export default NewDiagnosticForm