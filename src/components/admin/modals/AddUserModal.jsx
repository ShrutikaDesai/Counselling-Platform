import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";

const { Option } = Select;

const AddUserModal = ({ open, onClose, user, onSave }) => {
  const [form] = Form.useForm();

  const packages = ["Basic Package", "Standard Package", "Premium Package"];
  const programs = ["Engineering", "Medical", "Arts"];

  useEffect(() => {
    if (user) {
      // Prefill form if editing
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        program: user.program || "",
        package: user.package || "",
      });
    } else {
      form.resetFields(); // New user
    }
  }, [user, form]);

  const handleSubmit = (values) => {
    if (!values.firstName || !values.lastName) {
      message.error("First Name and Last Name are required!");
      return;
    }

    const newUser = {
      key: user?.key || Date.now(),
      ...values,
    };

    onSave(newUser);
    form.resetFields();
  };

  return (
    <Modal
      title={user ? "Edit User" : "Add New User"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Name Fields */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Email & WhatsApp */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="WhatsApp Mobile Number"
              name="mobile"
              rules={[
                { required: true, message: "Please enter mobile number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit number",
                },
              ]}
            >
              <Input placeholder="WhatsApp Number" maxLength={10} />
            </Form.Item>
          </Col>
        </Row>

        {/* Program Dropdown */}
        <Form.Item
          label="Program"
          name="program"
          rules={[{ required: true, message: "Please select a program" }]}
        >
          <Select placeholder="Select Program">
            {programs.map((prog) => (
              <Option key={prog} value={prog}>
                {prog}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Package Dropdown */}
        <Form.Item label="Package" name="package">
          <Select placeholder="Select package">
            {packages.map((pkg) => (
              <Option key={pkg} value={pkg}>
                {pkg}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Buttons */}

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {user ? "Update User" : "Add User"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default AddUserModal;
