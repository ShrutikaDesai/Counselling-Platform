// src/components/modals/EditProfileModal.js
import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const EditProfileModal = ({ visible, onClose, userData, onSave }) => {
  const [form] = Form.useForm();

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        role: userData.role,
      });
    }
  }, [visible, userData, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(values); // call parent to update data
      message.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[{ required: true, message: "Please enter your mobile number" }]}
        >
          <Input placeholder="Enter mobile number" />
        </Form.Item>

<Form.Item
  label="Role"
  name="role"
  rules={[{ required: true, message: "Please select role" }]}
>
  <Select placeholder="Select role" disabled>
    <Option value="Admin">Admin</Option>
    <Option value="User">Superadmin</Option>
    <Option value="Manager">Counsellor</Option>
  </Select>
</Form.Item>

      </Form>
    </Modal>
  );
};

export default EditProfileModal;
