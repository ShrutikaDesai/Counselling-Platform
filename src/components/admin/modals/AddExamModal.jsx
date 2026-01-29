import React from "react";
import { Modal, Form, Input, DatePicker, TimePicker, Select, Row, Col } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AddExamModal = ({ open, onCancel, onCreate, editingExam, mode }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (editingExam && (mode === "edit" || mode === "view")) {
      form.setFieldsValue({
        name: editingExam.name,
        program: editingExam.program,
        date: editingExam.date ? dayjs(editingExam.date) : null,
        duration: editingExam.duration
          ? dayjs()
              .hour(Math.floor(editingExam.duration / 60))
              .minute(editingExam.duration % 60)
          : null,
        link: editingExam.link,
      });
    } else {
      form.resetFields();
    }
  }, [editingExam, mode, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const durationInMinutes = values.duration
        ? values.duration.hour() * 60 + values.duration.minute()
        : 0;

      onCreate({
        ...values,
        duration: durationInMinutes,
      });
      form.resetFields();
    });
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit Exam" : "Add Exam"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === "edit" ? "Update" : "Add"}
    >
      <Form layout="vertical" form={form}>
        {/* Row 1: Exam Name and Program */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Exam Name"
              name="name"
              rules={[{ required: true, message: "Please enter exam name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Program"
              name="program"
              rules={[{ required: true, message: "Please select program" }]}
            >
              <Select placeholder="Select program">
                <Option value="Mathematics">Mathematics</Option>
                <Option value="Physics">Physics</Option>
                <Option value="Chemistry">Chemistry</Option>
                <Option value="Biology">Biology</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2: Date and Duration */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please select duration" }]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 3: Link */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Link" name="link">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddExamModal;
