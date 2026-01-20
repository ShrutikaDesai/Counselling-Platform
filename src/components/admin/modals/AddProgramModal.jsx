import React from "react";
import { Modal, Form, Input, InputNumber, Button, Row, Col } from "antd";

const AddProgramModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  // populate form if editing
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
      title={initialValues ? "Edit Program" : "Create New Program"}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Program Name"
          name="name"
          rules={[{ required: true, message: "Please enter program name" }]}
        >
          <Input placeholder="Enter program name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter program description" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please enter duration" }]}
            >
              <Input placeholder="e.g., 3 Months" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Number of Sessions"
              name="sessions"
              rules={[{ required: true, message: "Please enter number of sessions" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Enrolled Users"
          name="users"
          rules={[{ required: true, message: "Please enter enrolled users" }]}
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

export default AddProgramModal;
