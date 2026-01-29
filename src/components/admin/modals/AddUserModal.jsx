import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";
import { addUser } from "../../../adminSlices/userSlice";
import { fetchPrograms } from "../../../adminSlices/programSlice";
import { fetchPackages } from "../../../adminSlices/packageSlice";


const { Option } = Select;

const AddUserModal = ({ open, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { list: programs, loading: programLoading } = useSelector((state) => state.programs);
  const { list: packages, loading: packageLoading } = useSelector((state) => state.packages);
  const { loading: addUserLoading } = useSelector((state) => state.users);

  // -------- FETCH PROGRAMS & PACKAGES --------
useEffect(() => {
  if (open) {
    dispatch(fetchPrograms());
    dispatch(fetchPackages());
  }
}, [open, dispatch]);


  // -------- PREFILL FORM --------
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        program: user.program,
        package: user.package,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  // -------- SUBMIT --------
const handleSubmit = (values) => {
  dispatch(addUser(values))
    .unwrap()
    .then((res) => {
      message.success(res.message);
      form.resetFields();
      onClose();
    })
    .catch((err) => {
      // 🔥 Handle validation errors
      if (err?.errors) {
        Object.values(err.errors).forEach((messages) => {
          message.error(messages[0]);
        });
      } else {
        message.error(err?.message || "Something went wrong");
      }
    });
};


  return (
    <Modal
      title={user ? "Edit User" : "Add New User"}
      open={open}
      onCancel={() => {
          form.resetFields();
          onClose();
     }}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "Enter first name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Enter last name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mobile Number(WhatsApp)"
              name="phone"
              rules={[
                { required: true },
                { pattern: /^[0-9]{10}$/, message: "10 digit number" },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>

          {/* -------- PROGRAM DROPDOWN -------- */}
          <Col span={12}>
            <Form.Item
              label="Program"
              name="program"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select program"
                loading={programLoading}
                allowClear
              >
                {programs.map((p) => (
                  <Option key={p.id} value={p.id}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* -------- PACKAGE DROPDOWN -------- */}
         <Col span={12}>
  <Form.Item label="Package" name="package">
    <Select
      placeholder="Select package"
      loading={packageLoading}
      allowClear
    >
      {packages.map((pkg) => (
        <Option key={pkg.id} value={pkg.id}>
          {pkg.name}
        </Option>
      ))}
    </Select>
  </Form.Item>
</Col>

        </Row>

        <div style={{ textAlign: "right" }}>
         <Button
  type="primary"
  htmlType="submit"
  loading={addUserLoading}
  disabled={addUserLoading}
>
  {user ? "Update User" : "Add User"}
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
