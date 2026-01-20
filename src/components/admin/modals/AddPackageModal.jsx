import React from "react";
import { Modal, Form, Input, InputNumber, Button, Select } from "antd";

const { Option } = Select;

const AddPackageModal = ({ visible, onClose, onSubmit, initialValues, programs }) => {
  const [form] = Form.useForm();

  // Populate form if editing
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Package" : "Create New Package"}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Package Name"
          name="name"
          rules={[{ required: true, message: "Please enter package name" }]}
        >
          <Input placeholder="Enter package name" />
        </Form.Item>

        <Form.Item
          label="Program"
          name="program"
          rules={[{ required: true, message: "Please select a program" }]}
        >
          <Select placeholder="Select program">
            {programs.map((prog) => (
              <Option key={prog.key} value={prog.name}>{prog.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input placeholder="e.g., ₹10,000" />
        </Form.Item>

        <Form.Item
          label="Active Users"
          name="users"
          rules={[{ required: true, message: "Please enter active users" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPackageModal;
