import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Button,
  Divider,
  Tag,
  Badge,
  Modal,
  Steps,
  Image,
  ConfigProvider,
  theme,
} from "antd";
import {
  ClockCircleOutlined,
  FileTextOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  LockOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import antdTheme from "../../../theme/antdTheme";
import StatusTrackingModal from "../modals/StatusTrackingModal";


const { Title, Text } = Typography;

const ExamManagement = () => {

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [currentStatus] = useState(1);
  const statusSteps = ["Payment", "Scheduled", "Ongoing", "Completed"];
  const statusImages = [
    { alt: "Payment Receipt", src: "https://via.placeholder.com/80?text=Payment" },
    { alt: "Schedule", src: "https://via.placeholder.com/80?text=Schedule" },
    { alt: "Ongoing", src: "https://via.placeholder.com/80?text=Ongoing" },
    { alt: "Result", src: "https://via.placeholder.com/80?text=Result" },
  ];


  const { useToken } = theme;
  const PageContent = () => {
    const { token } = useToken();

    return (
      <div
        style={{
          // padding: "50px 20px",
          // background: "linear-gradient(180deg, #f9fafb 0%, #eef2ff 100%)",
          minHeight: "100vh",
        }}
      >

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title level={2} style={{ marginBottom: 6 }}>
            Career Assessment Test
          </Title>
          <Text type="secondary" style={{ fontSize: 15 }}>
            Discover your strengths, interests, and ideal career path
          </Text>
        </div>

        {/* Track Status button - top right */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <Button
            type="default"
            size="large"
            style={{
              borderRadius: 8,
              backgroundColor: token.colorSuccess,
              color: "#fff",
              fontWeight: "600",
              border: "none",
              boxShadow: token.boxShadow,
              transition: "transform 0.12s ease, box-shadow 0.12s ease",
              cursor: "pointer",
            }}
            onClick={() => setStatusModalVisible(true)}
          >
            Track Status
          </Button>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {/* LEFT COLUMN */}
          <Col xs={24} md={16}>

            <Card
              style={{
                borderRadius: 14,
                borderLeft: "6px solid #1677ff",
                background: "#ffffff",
                marginBottom: 28,
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={5}>
                <SafetyOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
                Important Instructions
              </Title>

              <List
                size="small"
                dataSource={[
                  "Exam duration: 60 minutes",
                  "Total questions: 100 (Multiple Choice)",
                  "You can save and resume within 24 hours",
                  "Once submitted, you cannot retake the exam",
                  "Results will be available after admin approval",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckCircleOutlined style={{ color: token.colorSuccess }} />
                      <Text>{item}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>

            {/* EXAM SECTIONS */}
            <Title
              level={5}
              style={{ marginBottom: 18, display: "flex", gap: 8 }}
            >
              <AppstoreOutlined />
              Exam Sections
            </Title>

            <Row gutter={[20, 20]}>
              {[
                {
                  title: "Aptitude & Reasoning",
                  meta: "30 questions • 20 minutes",
                },
                {
                  title: "Interest & Personality",
                  meta: "40 questions • 25 minutes",
                },
                {
                  title: "Subject Preference",
                  meta: "20 questions • 10 minutes",
                },
                {
                  title: "Career Values",
                  meta: "10 questions • 5 minutes",
                },
              ].map((section, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 14,
                      height: "100%",
                      transition: "all 0.3s",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Title level={5} style={{ marginBottom: 6 }}>
                      {section.title}
                    </Title>
                    <Tag color="blue">{section.meta}</Tag>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* BEFORE YOU BEGIN */}
            <Card
              style={{
                borderRadius: 14,
                marginTop: 32,
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={5}>
                <InfoCircleOutlined style={{ color: token.colorPrimary, marginRight: 6 }} />
                Before You Begin
              </Title>

              <List
                size="small"
                dataSource={[
                  "Stable internet connection required",
                  "Find a quiet place without distractions",
                  "Have a pen and paper for rough work (optional)",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckCircleOutlined style={{ color: token.colorSuccess }} />
                      <Text>{item}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>

            {/* PAYMENT STATUS */}
            <Card
              style={{
                borderRadius: 14,
                marginTop: 32,
                background: "linear-gradient(90deg,#fff7e6,#fff1b8)",
                border: "1px solid #faad14",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={5}>
                <LockOutlined style={{ marginRight: 8 }} />
                Payment Status
              </Title>
              <Text strong>
                This exam is included in your <Tag color="gold">Premium Package</Tag>
              </Text>
            </Card>
          </Col>

          {/* RIGHT COLUMN */}
          <Col xs={24} md={8}>
            <div style={{ position: "sticky", top: 100 }}>
              <Badge.Ribbon text="Recommended" color="blue">
                <Card
                  style={{
                    borderRadius: 16,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                  }}
                >
                  <Title level={4}>Exam Details</Title>

                  <Divider />

                  <List
                    size="small"
                    dataSource={[
                      {
                        icon: <ClockCircleOutlined />,
                        label: "Duration",
                        value: "60 Minutes",
                      },
                      {
                        icon: <FileTextOutlined />,
                        label: "Questions",
                        value: "100 MCQs",
                      },
                      {
                        icon: <SafetyOutlined />,
                        label: "Marking",
                        value: "No Negative Marking",
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <Text strong>
                          {item.icon} {item.label}:
                        </Text>
                        <Text style={{ marginLeft: 6 }}>{item.value}</Text>
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      borderRadius: 10,
                      height: 48,
                      fontSize: 16,
                    }}
                    onClick={() => console.log("Start Exam")}
                  >
                    Start Exam
                  </Button>

                  <Text
                    type="secondary"
                    style={{
                      display: "block",
                      textAlign: "center",
                      marginTop: 8,
                      fontSize: 12,
                    }}
                  >
                    Note: This will redirect to an external assessment platform
                  </Text>


                </Card>
              </Badge.Ribbon>
            </div>
          </Col>
        </Row>
      </div>
    );
  };


  return (
    <ConfigProvider theme={antdTheme}>
      <PageContent />

      <StatusTrackingModal
        open={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
      />

    </ConfigProvider>
  );
};

export default ExamManagement;
