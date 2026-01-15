import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Badge,
  Grid,
} from "antd";
import {
  BookOutlined,
  ContainerOutlined,
  FileTextOutlined,
  LockOutlined,
} from "@ant-design/icons";
import JourneySteps from "./JourneySteps";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const StudentDashboard = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: screens.xs ? "4px" : "30px 20px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* ===================== PROGRESS STEPS ===================== */}
      <div
        style={{
          overflowX: "auto",
          paddingBottom: 10,
        }}
      >
        <JourneySteps currentStep={1} />
      </div>

      {/* ===================== CHOOSE YOUR PATH ===================== */}
      <Card
        style={{
          background: "linear-gradient(90deg,#7a5fff,#a267ff)",
          color: "#fff",
          margin: "32px 0",
          borderRadius: 14,
        }}
      >
        <Row
          align="middle"
          justify="space-between"
          gutter={[16, 16]}
        >
          {/* TEXT SECTION */}
          <Col xs={24} md={16}>
            <Title
              level={4}
              style={{ color: "#fff", marginBottom: 6 }}
            >
              Choose Your Path
            </Title>
            <Text
              style={{
                color: "#f0f0f0",
                fontSize: 16,
              }}
            >
              Select a program and package to begin your career counselling journey
            </Text>
          </Col>

          {/* BUTTON SECTION */}
          <Col
            xs={24}
            md={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="large"
              block={false}
              onClick={() => navigate("/student/program")}
              style={{
                borderRadius: 6,
                fontWeight: 500,
                width: "auto",
              }}
            >
              View Programs & Packages →
            </Button>
          </Col>
        </Row>
      </Card>


      {/* ===================== DASHBOARD CARDS ===================== */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Row align="middle" justify="space-between">
              <BookOutlined style={{ fontSize: 26, color: "#52c41a" }} />
              <Badge count="Free" style={{ backgroundColor: "#52c41a" }} />
            </Row>
            <Title level={5} style={{ marginTop: 16 }}>
              Free Content Library
            </Title>
            <Text type="secondary">
              Explore free videos, articles and guidance
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <ContainerOutlined style={{ fontSize: 26, color: "#7265e6" }} />
            <Title level={5} style={{ marginTop: 16 }}>
              My Program
            </Title>
            <Text type="secondary">
              View your enrolled counselling program
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <FileTextOutlined style={{ fontSize: 26, color: "#9254de" }} />
            <Title level={5} style={{ marginTop: 16 }}>
              My Assessment Report
            </Title>
            <Text type="secondary">
              Download your career assessment results
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <LockOutlined style={{ fontSize: 26, color: "#d4380d" }} />
            <Title level={5} style={{ marginTop: 16 }}>
              Locked Content
            </Title>
            <Text type="secondary">
              Complete steps to unlock premium features
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
