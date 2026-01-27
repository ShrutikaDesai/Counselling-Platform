import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  message,
} from "antd";
import dayjs from "dayjs";
import adminTheme from "../../../theme/adminTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnquiry,
  clearAddEnquiryState,
} from "../../../adminSlices/addEnquirySlice";
import { fetchPrograms } from "../../../adminSlices/programSlice";

const { Option } = Select;

const AddEnquiryModal = ({ open, onCancel, mode, enquiryData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // ---------------- ADD ENQUIRY STATE ----------------
  const { loading, success, error } = useSelector(
    (state) => state.addEnquiry
  );

  // ---------------- PROGRAM STATE ----------------
  const {
    list: programs = [],     // ✅ SAFE DEFAULT
    loading: programLoading,
  } = useSelector((state) => state.programs);

  // ---------------- FETCH PROGRAMS ----------------
  useEffect(() => {
    if (open) {
      dispatch(fetchPrograms());
    }
  }, [open, dispatch]);

  // ---------------- PREFILL ON CONVERT ----------------
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

  // ---------------- SUCCESS ----------------
  useEffect(() => {
    if (success) {
      message.success("Enquiry saved successfully");
      dispatch(clearAddEnquiryState());
      form.resetFields();
      onCancel();
    }
  }, [success, dispatch, onCancel, form]);

  // ---------------- ERROR ----------------
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearAddEnquiryState());
    }
  }, [error, dispatch]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = (values) => {
    const selectedProgram = programs.find(p => p.id === values.program);
    
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      email: values.email,
      program: selectedProgram?.id || values.program,
      source: values.source,
      date: values.date
        ? values.date.format("YYYY-MM-DD")
        : null,
      status: mode === "convert" ? "converted" : "enquiry",
    };

    dispatch(addEnquiry(payload));
  };

  // ---------------- DISABLE FUTURE DATES ----------------
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <Modal
      title={mode === "convert" ? "Convert Enquiry to User" : "Add Enquiry"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "First name is required" },
                { min: 2 },
                { max: 50 },
                { pattern: /^[a-zA-Z\s]*$/, message: "Only letters allowed" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true },
                { min: 2 },
                { max: 50 },
                { pattern: /^[a-zA-Z\s]*$/, message: "Only letters allowed" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true },
                { len: 10, message: "Phone must be 10 digits" },
                { pattern: /^[0-9]*$/, message: "Digits only" },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* -------- PROGRAM DROPDOWN -------- */}
          <Col span={12}>
            <Form.Item
              name="program"
              label="Program"
              rules={[{ required: true, message: "Select a program" }]}
            >
              <Select
                placeholder="Select program"
                loading={programLoading}
                allowClear
              >
                {programs.map((program) => (
                  <Option key={program.id} value={program.id}>
                    {program.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="source"
              label="Source"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select source">
                <Option value="website">Website</Option>
                <Option value="whatsapp">WhatsApp</Option>
                <Option value="call">Call</Option>
                <Option value="walk_in">Walk-In</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="date" label="Enquiry Date">
              <DatePicker 
                style={{ width: "100%" }} 
                disabledDate={disabledDate}
                placeholder="Select enquiry date"
              />
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
            loading={loading}
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
