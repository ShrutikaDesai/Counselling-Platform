import React from "react";
import { Modal, Row, Col, Typography, Card, Empty } from "antd";
import adminTheme from "../../../theme/adminTheme";

const { Title, Text } = Typography;
const { token } = adminTheme;

/* ========================
   Reusable Field
======================== */
const Field = ({ label, value }) => (
  <div style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontSize: token.fontSize,
        color: token.colorTextSecondary,
        fontFamily: token.fontFamily,
      }}
    >
      {label}
    </Text>

    <div
      style={{
        marginTop: 8,
        padding: "12px 14px",
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
        background: token.colorBgContainer,
        fontSize: token.fontSize,
        color: token.colorTextBase,
        fontFamily: token.fontFamily,
      }}
    >
      {value || <Text type="secondary">N/A</Text>}
    </div>
  </div>
);

/* ========================
   Modal Component
======================== */
const PaymentProofModal = ({ open, onClose, data }) => {
  if (!data) return null;

  // 👇 SAFE PREVIEW URL (PDF only)
  const previewUrl = data?.proofUrl || null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={760}
      title={
        <Title
          level={4}
          style={{
            margin: 0,
            color: token.colorTextBase,
            fontFamily: token.fontFamily,
          }}
        >
          Payment Details
        </Title>
      }
    >
      <Field label="Student Name" value={data.name} />
      <Field label="Package" value={data.package} />

      <Row gutter={20}>
        <Col span={12}>
          <Field label="Status" value={data.status} />
        </Col>
        <Col span={12}>
          <Field label="Payment Method" value={data.paymentMethod} />
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <Field label="Amount" value={data.amount} />
        </Col>
        <Col span={12}>
          <Field label="Payment Date" value={data.date} />
        </Col>
      </Row>

      <Field label="Transaction ID" value={data.txn} />

      {/* ========================
          Uploaded Report
      ======================== */}
      <div style={{ marginTop: 28 }}>
        <Title
          level={5}
          style={{
            marginBottom: 16,
            color: token.colorTextBase,
            fontFamily: token.fontFamily,
          }}
        >
          Uploaded Report
        </Title>

        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} style={{ display: "flex", justifyContent: "center" }}>
            {previewUrl ? (
              <Card
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 180,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f9f9f9",
                  padding: 10,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 16,
                  }}
                />
              </Card>
            ) : (
              <Empty description="No report uploaded yet" />
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default PaymentProofModal;
