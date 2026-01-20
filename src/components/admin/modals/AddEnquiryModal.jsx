import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import dayjs from "dayjs";
import adminTheme from "../../../theme/adminTheme";

const { Option } = Select;

const AddEnquiryModal = ({ open, onCancel, mode, enquiryData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "convert" && enquiryData) {
      form.setFieldsValue({
        ...enquiryData,
        date: enquiryData.date ? dayjs(enquiryData.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [mode, enquiryData, form]);

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      status: mode === "convert" ? "Converted" : "New",
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };

    if (mode === "convert") {
      console.log("Converted User Data:", payload);
    } else {
      console.log("New Enquiry Data:", payload);
    }

    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={mode === "convert" ? "Convert Enquiry to User" : "Add New Enquiry"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
       >
      <br></br><Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="program" label="Program" rules={[{ required: true }]}>
              <Select>
                <Option value="Engineering">Engineering</Option>
                <Option value="Medical">Medical</Option>
                <Option value="Commerce">Commerce</Option>
                <Option value="Arts">Arts</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="source" label="Source" rules={[{ required: true }]}>
              <Select>
                <Option value="Website">Website</Option>
                <Option value="WhatsApp">WhatsApp</Option>
                <Option value="Call">Call</Option>
                <Option value="Walk-In">Walk-In</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="date" label="Enquiry Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: adminTheme.token.colorPrimary,
              borderRadius: adminTheme.token.borderRadius,
            }}
          >
            {mode === "convert" ? "Convert User" : "Save Enquiry"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEnquiryModal;
