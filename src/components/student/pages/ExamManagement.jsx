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
  QuestionCircleOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import StatusTrackingModal from "../modals/StatusTrackingModal";
import InstructionsModal from "../modals/InstructionsModal";

const { Title, Text } = Typography;

const ExamManagement = () => {
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(false);

  const { useToken } = theme;
  
  const PageContent = () => {
    const { token } = useToken();

    return (
      <div style={{ minHeight: "100vh" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title level={2} style={{ marginBottom: 6 }}>
            Career Assessment Test
          </Title>
          <Text type="colorTextSecondary" style={{ fontSize: 15 }}>
            Discover your strengths, interests, and ideal career path
          </Text>
        </div>

        {/* Action Buttons - top right */}
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap" 
        }}>
          <Button
            type="default"
            size="large"
            icon={<QuestionCircleOutlined />}
            style={{
              borderRadius: 8,
              backgroundColor: token.colorPrimary,
              color: "#fff",
              fontWeight: "600",
              border: "none",
              boxShadow: token.boxShadow,
              transition: "transform 0.12s ease, box-shadow 0.12s ease",
            }}
            onClick={() => setInstructionsModalVisible(true)}
          >
            Instructions
          </Button>
          
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
            }}
            onClick={() => setStatusModalVisible(true)}
          >
            Track Status
          </Button>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {/* LEFT COLUMN - Removed Important Instructions card */}
          <Col xs={24} md={16}>
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
                    type="colorTextSecondary"
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
    <ConfigProvider theme={adminTheme}>
      <PageContent />
      
      {/* Imported Modals */}
      <InstructionsModal
        open={instructionsModalVisible}
        onClose={() => setInstructionsModalVisible(false)}
      />
      
      <StatusTrackingModal
        open={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
      />
    </ConfigProvider>
  );
};

export default ExamManagement;