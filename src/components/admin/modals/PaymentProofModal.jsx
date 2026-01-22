import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Empty,
  Form,
  Input,
  Select,
  Button,
  Divider,
  Upload,
  message,
  Grid,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { token } = adminTheme;
const { useBreakpoint } = Grid;

/* ---------------- STYLES ---------------- */
const labelStyle = {
  fontSize: token.fontSize,
  color: token.colorTextSecondary,
};

const valueBoxStyle = {
  marginTop: 8,
  padding: "12px 14px",
  borderRadius: token.borderRadius,
  border: `1px solid ${token.colorBorder}`,
  background: token.colorBgContainer,
};

/* ---------------- COMPONENT ---------------- */
const PaymentProofModal = ({ open, onClose, data }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const mode = data?.mode || "view";
  const isEdit = mode === "edit";
  const isVerify = mode === "verify";

  /* -------- PREVIEW URL -------- */
  const previewUrl = file ? URL.createObjectURL(file) : data?.proofUrl || null;

  useEffect(() => {
    if (open && data) {
      form.resetFields();

      const formValues = {
        ...data,
        // Convert paymentDate to dayjs for edit mode
        paymentDate: data.paymentDate
          ? isEdit
            ? dayjs(data.paymentDate)
            : dayjs(data.paymentDate).format("YYYY-MM-DD")
          : null,
      };

      form.setFieldsValue(formValues);
      setFile(null);
    }
  }, [open, isEdit, data, form]);

  if (!data) return null;

  /* -------- HANDLERS -------- */
  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        reportFile: file,
      };
      console.log("UPDATED DATA 👉", payload);
      onClose();
    });
  };

  const handleVerify = (status) => {
    form.validateFields().then((values) => {
      const payload = {
        id: data.key,
        verifiedAmount: values.verifiedAmount,
        finalStatus: status,
        remarks: values.remarks,
      };

      console.log("VERIFICATION PAYLOAD 👉", payload);
      onClose();
    });
  };

  const uploadProps = {
    accept: ".pdf",
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("Only PDF files are allowed");
        return Upload.LIST_IGNORE;
      }
      setFile(file);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <Modal
      key={mode}
      open={open}
      destroyOnClose
      centered
      width={isMobile ? "95%" : 760}
      onCancel={onClose}
      title={<Title level={4}>Payment Details</Title>}
      footer={
        isEdit ? (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </>
        ) : isVerify ? null : (
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
        )
      }
    >
      {/* ================= FORM / VIEW SECTION ================= */}
      {isEdit ? (
        <Form form={form} layout="vertical">
          <Form.Item label="Student Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Package" name="package">
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status">
                <Select>
                  <Option value="Fully Paid">Fully Paid</Option>
                  <Option value="Partial Paid">Partial Paid</Option>
                  <Option value="Pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Payment Method" name="paymentMethod">
                <Select>
                  <Option value="UPI">UPI</Option>
                  <Option value="Card">Card</Option>
                  <Option value="Net Banking">Net Banking</Option>
                  <Option value="Cash">Cash</Option>
                  <Option value="Wallet">Wallet</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Amount" name="amount">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Transaction ID" name="txn">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Payment Date" name="paymentDate">
                <DatePicker
                  style={{
                    width: "100%",
                    marginTop: 4,
                    height: 36,
                    borderRadius: 6,
                  }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <Text style={labelStyle}>Student Name</Text>
          <div style={valueBoxStyle}>{data.name}</div>

          <Text style={labelStyle}>Package</Text>
          <div style={valueBoxStyle}>{data.package}</div>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Text style={labelStyle}>Status</Text>
              <div style={valueBoxStyle}>{data.status}</div>
            </Col>

            <Col xs={24} md={12}>
              <Text style={labelStyle}>Payment Method</Text>
              <div style={valueBoxStyle}>{data.paymentMethod}</div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Text style={labelStyle}>Amount</Text>
              <div style={valueBoxStyle}>{data.amount}</div>
            </Col>

            <Col xs={24} md={12}>
              <Text style={labelStyle}>Transaction ID</Text>
              <div style={valueBoxStyle}>{data.txn}</div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Text style={labelStyle}>Payment Date</Text>
              <div style={valueBoxStyle}>
                {data.paymentDate
                  ? dayjs(data.paymentDate).format("YYYY-MM-DD")
                  : "-"}
              </div>
            </Col>
          </Row>
        </>
      )}

      {/* ================= UPLOAD / PREVIEW ================= */}
      <Divider />
      <Title style={labelStyle} level={5}>
        Upload Receipt / Screenshot
      </Title>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: 20,
          padding: isMobile ? 20 : "28px 32px",
          borderRadius: 16,
          border: `1px dashed ${token.colorBorder}`,
        }}
      >
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="PDF Preview"
            style={{
              width: "100%",
              maxWidth: 360,
              height: 220,
              borderRadius: 12,
              border: "1px solid #e0e0e0",
              background: "#fff",
            }}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Empty description="No receipt / screenshot uploaded yet" />
          </div>
        )}

        {isEdit && (
          <Upload {...uploadProps}>
            <Button
              type="primary"
              size="large"
              block={isMobile}
              icon={<UploadOutlined />}
            >
              {previewUrl ? "Change" : "Upload"}
            </Button>
          </Upload>
        )}
      </div>

      {/* ================= VERIFY SECTION ================= */}
      {isVerify && (
        <>
          <Divider />
          <Row justify="end" gutter={8} style={{ marginTop: 16 }}>
            <Col>
              <Button danger onClick={() => handleVerify("Rejected")}>
                Reject Payment
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={() => handleVerify("Approved")}>
                Approve Payment
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
};

export default PaymentProofModal;
