import React, { useEffect } from "react";
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
import dayjs from "dayjs";

const { Option } = Select;

const counsellors = [
  { id: 1, name: "Dr. Ramesh Gupta" },
  { id: 2, name: "Ms. Priya Menon" },
  { id: 3, name: "Dr. Neha Sharma" },
];

const CreateSlotModal = ({
  open,
  onCancel,
  onCreate,
  editingSlot,
  mode = "create", // create | edit | view
}) => {
  const [form] = Form.useForm();
  const isView = mode === "view";

  // style for readonly behavior
  const readOnlyStyle = isView
    ? { pointerEvents: "none", background: "transparent" }
    : {};

  useEffect(() => {
    if (editingSlot) {
      const lead = editingSlot.counsellors?.find((c) => c.type === "lead");
      const normal = editingSlot.counsellors?.find((c) => c.type === "normal");

      const leadOption = counsellors.find((c) => c.name === lead?.name);
      const normalOption = counsellors.find((c) => c.name === normal?.name);

      form.setFieldsValue({
        leadCounsellor: leadOption?.id,
        normalCounsellor: normalOption?.id,
        date: dayjs(editingSlot.date),
        time: dayjs(editingSlot.time, "hh:mm A"),
        mode: editingSlot.mode,
        duration: editingSlot.duration,
      });
    } else {
      form.resetFields();
    }
  }, [editingSlot, form]);

  const handleFinish = (values) => {
    if (isView) return;
    onCreate(values);
    form.resetFields();
  };

  const getTitle = () => {
    if (mode === "view") return "View Counselling Slot";
    if (mode === "edit") return "Edit Counselling Slot";
    return "Create Counselling Slot";
  };

  return (
    <Modal
      title={getTitle()}
      open={open}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          {/* Lead Counsellor */}
          <Col span={24}>
            <Form.Item
              label="Lead Counsellor"
              name="leadCounsellor"
              rules={
                isView
                  ? []
                  : [{ required: true, message: "Please select lead counsellor" }]
              }
            >
              <Select
                placeholder="Select Lead Counsellor"
                style={readOnlyStyle}
                open={isView ? false : undefined}
              >
                {counsellors.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Normal Counsellor */}
          <Col span={24}>
            <Form.Item
              label="Normal Counsellor (Optional)"
              name="normalCounsellor"
            >
              <Select
                allowClear
                placeholder="Select Normal Counsellor"
                style={readOnlyStyle}
                open={isView ? false : undefined}
              >
                {counsellors.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Date */}
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={
                isView
                  ? []
                  : [{ required: true, message: "Please select date" }]
              }
            >
              <DatePicker
                style={{ width: "100%", ...readOnlyStyle }}
                open={isView ? false : undefined}
              />
            </Form.Item>
          </Col>

          {/* Time */}
          <Col span={12}>
            <Form.Item
              label="Time"
              name="time"
              rules={
                isView
                  ? []
                  : [{ required: true, message: "Please select time" }]
              }
            >
              <TimePicker
                use12Hours
                format="hh:mm A"
                style={{ width: "100%", ...readOnlyStyle }}
                open={isView ? false : undefined}
              />
            </Form.Item>
          </Col>

          {/* Mode */}
          <Col span={24}>
            <Form.Item
              label="Session Mode"
              name="mode"
              rules={
                isView
                  ? []
                  : [{ required: true, message: "Please select session mode" }]
              }
            >
              <Radio.Group style={readOnlyStyle}>
                <Radio.Button value="Online">
                  <VideoCameraOutlined /> Online
                </Radio.Button>
                <Radio.Button value="Offline">
                  <EnvironmentOutlined /> Offline
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {/* Duration */}
          <Col span={24}>
            <Form.Item
              label="Duration (minutes)"
              name="duration"
              rules={
                isView
                  ? []
                  : [{ required: true, message: "Please enter duration" }]
              }
            >
              <InputNumber
                min={15}
                step={15}
                style={{ width: "100%" }}
                readOnly={isView}   // ✅ true readonly support
                placeholder="Enter duration"
              />
            </Form.Item>
          </Col>

          {/* Buttons */}
          <Col span={24}>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button onClick={onCancel}>
                  {isView ? "Close" : "Cancel"}
                </Button>

                {!isView && (
                  <Button type="primary" htmlType="submit">
                    {mode === "edit" ? "Update" : "Create"}
                  </Button>
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateSlotModal;
