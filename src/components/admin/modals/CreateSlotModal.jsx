import React from "react";
import {
  Modal,
  Form,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Radio,
  Button,
  Row,
  Col,
} from "antd";
import { VideoCameraOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Option } = Select;

const counsellors = [
  { id: 1, name: "Dr. Ramesh Gupta" },
  { id: 2, name: "Ms. Priya Menon" },
  { id: 3, name: "Dr. Neha Sharma" },
];

const CreateSlotModal = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Create Counselling Slot"
      open={open}
      onCancel={onCancel} // This will close the modal
      destroyOnClose
      footer={null} // We'll handle buttons ourselves
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Assign Counsellor"
              name="counsellor"
              rules={[{ required: true, message: "Please select a counsellor" }]}
            >
              <Select placeholder="Select Counsellor">
                {counsellors.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: "Please select a time" }]}
            >
              <TimePicker use12Hours format="hh:mm A" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Session Mode"
              name="mode"
              initialValue="Online"
              rules={[{ required: true, message: "Please select session mode" }]}
            >
              <Radio.Group>
                <Radio.Button value="Online">
                  <VideoCameraOutlined /> Online
                </Radio.Button>
                <Radio.Button value="Offline">
                  <EnvironmentOutlined /> Offline
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Duration (minutes)"
              name="duration"
              initialValue={60}
              rules={[{ required: true, message: "Please enter duration" }]}
            >
              <InputNumber min={15} step={15} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Buttons */}
          <Col span={24}>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateSlotModal;
