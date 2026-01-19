import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Alert,
  Grid,
} from "antd";
import {
  FilePdfOutlined,
  LockOutlined,
  DownloadOutlined,
  EyeOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

/* ===================== REPORT CARD COMPONENT ===================== */
const ReportCard = ({ locked, fileUrl }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const cardBodyStyle = screens.xs ? { padding: 12 } : { padding: 20 };

  // Download handler
  const handleDownload = () => {
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); // Use file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View handler (open PDF in new tab)
  const handleView = () => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank");
  };

  return (
    <Card
      style={{
        height: "100%",
        borderRadius: 16,
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5} style={{ marginBottom: 2 }}>
            Career Assessment Report
          </Title>
        </Col>
        <Col>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: locked ? "#cf1322" : "#16a34a",
            }}
          >
            {locked ? "Locked" : "Unlocked"}
          </Text>
        </Col>
      </Row>

      <Divider />

      {/* PDF Preview */}
      <div
        style={{
          height: 260,
          borderRadius: 12,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: locked
            ? "linear-gradient(180deg,#020617,#0f172a)"
            : "#f3f4f6",
        }}
      >
        {locked ? (
          <div style={{ textAlign: "center", color: "#fff" }}>
            <LockOutlined style={{ fontSize: 48, marginBottom: 12 }} />
            <Title level={5} style={{ color: "#fff" }}>
              Report Locked
            </Title>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <FilePdfOutlined style={{ fontSize: 46, color: "#9ca3af" }} />
            <Text style={{ display: "block", marginTop: 8 }}>PDF Preview</Text>
            <Text type="secondary">32 pages</Text>
          </div>
        )}
      </div>

      {/* Report Info */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CalendarOutlined style={{ color: "#6b7280" }} />
          <Text type="secondary">07 Jan 2026</Text>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <InfoCircleOutlined style={{ color: "#6b7280" }} />
          <Text type="secondary">2.4 MB</Text>
        </div>
      </div>

      <Divider />

      {/* Actions */}
      {!locked ? (
        <>
          <Button
            block
            size="large"
            icon={<EyeOutlined />}
            style={{
              borderRadius: 10,
              marginBottom: 10,
              background: "#0f172a",
              color: "#fff",
            }}
            onClick={handleView}
          >
            View Report
          </Button>

          <Button
            block
            size="large"
            icon={<DownloadOutlined />}
            style={{ borderRadius: 10 }}
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </>
      ) : (
        <>
          <Alert
            type="warning"
            showIcon
            icon={<LockOutlined />}
            message="Payment Required"
            description="Complete your payment to unlock this report"
            style={{ marginBottom: 16 }}
          />

          <Button
            block
            size="large"
            disabled
            icon={<LockOutlined />}
            style={{
              borderRadius: 10,
              background: "#f1b58d",
              color: "#fff",
            }}
          >
            Report Locked
          </Button>
        </>
      )}
    </Card>
  );
};

/* ======================= REPORT MANAGEMENT PAGE ======================= */
const ReportManagement = () => {
  return (
    <div
      style={{
        padding: "16px",
        minHeight: "100vh",
        textAlign:"center",
      }}
    >
      <Title level={2}>My Reports</Title>
      <Text type="secondary">View and download your assessment reports</Text>

      <Divider />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ReportCard locked={false} fileUrl="/Career Counselling & Assessment Platform.pdf" />
        </Col>

        <Col xs={24} md={12}>
          <ReportCard locked={true} />
        </Col>
      </Row>
    </div>
  );
};

export default ReportManagement;
