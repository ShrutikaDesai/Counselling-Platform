import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../adminSlices/userSlice";
import { fetchPrograms } from "../../../adminSlices/programSlice";
import { fetchPackages } from "../../../adminSlices/packageSlice";

const { Option } = Select;

const AddUserModal = ({ open, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { list: programs } = useSelector((state) => state.programs);
  const { list: packages } = useSelector((state) => state.packages);
  const { loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (open) {
      dispatch(fetchPrograms());
      dispatch(fetchPackages());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleSubmit = (values) => {
    dispatch(addUser(values))
      .unwrap()
      .then(() => {
        message.success("User added successfully");
        
        form.resetFields();
        onClose();
      })
      .catch((err) => {
        message.error(err?.message || "Failed to add user");
      });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Add User"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input maxLength={10} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="program" label="Program" rules={[{ required: true }]}>
              <Select>
                {programs.map((p) => (
                  <Option key={p.id} value={p.id}>{p.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="package" label="Package">
              <Select>
                {packages.map((p) => (
                  <Option key={p.id} value={p.id}>{p.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add User
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
