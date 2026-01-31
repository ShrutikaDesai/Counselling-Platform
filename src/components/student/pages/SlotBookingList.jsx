import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Avatar,
  Modal,
  Grid,
} from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import BookSessionModal from "../modals/BookSessionModal";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const SlotBookingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null); // For rescheduling
  const screens = useBreakpoint();

  let sessions = [
    {
      id: 1,
      counsellor: "Dr. Meera Iyer",
      role: "Career Counsellor",
      date: "2026-01-08",
      time: "10:00 AM",
      mode: "Online",
      duration: "60 mins",
      status: "Completed",
    },
    {
      id: 2,
      counsellor: "Prof. Anil Verma",
      role: "Career Counsellor",
      date: "2026-01-12",
      time: "02:00 PM",
      mode: "Online",
      duration: "60 mins",
      status: "Upcoming",
    },
  ];

  // Sort: Upcoming first, then Completed
  sessions = sessions.sort((a, b) => {
    if (a.status === "Upcoming" && b.status !== "Upcoming") return -1;
    if (a.status !== "Upcoming" && b.status === "Upcoming") return 1;
    return 0;
  });

  const statusColor = (status) => {
    if (status === "Completed") return "green";
    if (status === "Upcoming") return "blue";
    return "red";
  };

  const handleReschedule = (session) => {
    // Open modal with prefilled data
    setRescheduleData(session);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: screens.md ? 24 : 12 }}>
      {/* HEADER */}
      <Row
        gutter={[12, 12]}
        align="middle"
        justify="space-between"
        style={{
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Col flex="auto">
          <Title level={3} style={{ margin: 0 ,  textAlign:"center", padding: "16px" }}>
            My Counselling Sessions
          </Title>
        </Col>

        <Col xs={24} md="auto" style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setRescheduleData(null); // New booking
              setIsModalOpen(true);
            }}
            style={{ borderRadius: 8 }}
          >
            Book Session
          </Button>
        </Col>
      </Row>

      {/* SESSION LIST */}
      <Space direction="vertical" size={24} style={{ width: "100%" }}>
        {sessions.map((session) => (
          <Card
            key={session.id}
            style={{
              borderRadius: 16,
              border: "1px solid #e5e7eb",
            }}
          >
            {/* HEADER */}
            <Row justify="space-between" align="middle" gutter={[12, 12]}>
              <Col xs={24} sm="auto">
                <Space>
                  <Avatar size={48} icon={<UserOutlined />} />
                  <div>
                    <Text strong style={{ fontSize: 16 }}>
                      {session.counsellor}
                    </Text>
                    <br />
                    <Text type="colorTextSecondary">{session.role}</Text>
                  </div>
                </Space>
              </Col>

              <Col xs={24} sm="auto">
                <Tag
                  color={statusColor(session.status)}
                  style={{
                    fontSize: 14,
                    padding: "4px 12px",
                    borderRadius: 20,
                  }}
                >
                  {session.status}
                </Tag>
              </Col>
            </Row>

            {/* DETAILS */}
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col xs={24} sm={12} md={6}>
                <Card bordered={false} style={{ background: "#f9fafb" }}>
                  <Text type="colorTextSecondary">Date</Text>
                  <br />
                  <Text strong>
                    <CalendarOutlined /> {session.date}
                  </Text>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card bordered={false} style={{ background: "#f9fafb" }}>
                  <Text type="colorTextSecondary">Time</Text>
                  <br />
                  <Text strong>
                    <ClockCircleOutlined /> {session.time}
                  </Text>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card bordered={false} style={{ background: "#f9fafb" }}>
                  <Text type="colorTextSecondary">Mode</Text>
                  <br />
                  <Text strong>
                    <VideoCameraOutlined /> {session.mode}
                  </Text>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card bordered={false} style={{ background: "#f9fafb" }}>
                  <Text type="colorTextSecondary">Duration</Text>
                  <br />
                  <Text strong>{session.duration}</Text>
                </Card>
              </Col>
            </Row>

            {/* ACTIONS */}
            {session.status === "Upcoming" && (
              <Row style={{ marginTop: 24 }}>
                <Col xs={24}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: screens.md ? "row" : "column",
                      justifyContent: "flex-end",
                      alignItems: screens.md ? "center" : "stretch",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Button
                      type="primary"
                      icon={<VideoCameraOutlined />}
                      size="large"
                      style={{
                        borderRadius: 10,
                        paddingInline: screens.md ? 32 : undefined,
                        width: screens.md ? "auto" : "100%",
                      }}
                    >
                      Join Session
                    </Button>

                    <Button
                      icon={<ReloadOutlined />}
                      size="large"
                      style={{
                        borderRadius: 10,
                        width: screens.md ? "auto" : "100%",
                      }}
                      onClick={() => handleReschedule(session)}
                    >
                      Reschedule
                    </Button>

                    <Button
                      danger
                      icon={<CloseOutlined />}
                      size="large"
                      style={{
                        borderRadius: 10,
                        width: screens.md ? "auto" : "100%",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Card>
        ))}
      </Space>

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={screens.md ? 1000 : "100%"}
        style={!screens.md ? { top: 0 } : {}}
        bodyStyle={!screens.md ? { padding: 12 } : {}}
      >
        <BookSessionModal
          rescheduleData={rescheduleData}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SlotBookingList;
