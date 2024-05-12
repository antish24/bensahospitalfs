import { Form, Input, Select, Button,Option } from 'antd';

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
        <Select>
          <Option value="xray">X-ray</Option>  
          <Option value="mri">MRI</Option>
        </Select>
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
        <Select>
          <Option value="routine">Routine</Option>
          <Option value="urgent">Urgent</Option> 
          <Option value="stat">Stat</Option>
        </Select>
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