import React ,{useState}from "react";
import {
    Row,
    Col,
    Card,
    Typography,
    Button,
    Table,
    Tag,
    Space,
    Modal,
} from "antd";
import {
    PlusOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import BookSessionModal from "../../student/modals/BookSessionModal";

const { Title, Text } = Typography;
const { token } = adminTheme;

const SlotBooking = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);
    /* ----------------- STATS DATA ----------------- */
    const stats = [
        {
            title: "Total Sessions",
            value: 284,
            icon: (
                <CalendarOutlined
                    style={{ fontSize: 20, color: token.colorPrimary }}
                />
            ),
        },
        {
            title: "Today's Sessions",
            value: 12,
            sub: "5 completed, 7 upcoming",
            icon: (
                <ClockCircleOutlined
                    style={{ fontSize: 20, color: token.colorPrimary }}
                />
            ),
        },
        {
            title: "This Week",
            value: 38,
            icon: (
                <CalendarOutlined
                    style={{ fontSize: 20, color: token.colorPrimary }}
                />
            ),
        },
        {
            title: "Completed",
            value: 234,
            icon: (
                <CheckCircleOutlined
                    style={{ fontSize: 20, color: token.colorPrimary }}
                />
            ),
        },
    ];

    /* ----------------- TABLE COLUMNS ----------------- */
    const columns = [
        {
            title: "User ",
            dataIndex: "user",
            key: "user",
            render: (_, record) => (
                <div>
                    <Text strong style={{ color: token.colorTextBase }}>
                        {record.user}
                    </Text>
                    
                </div>
            ),
        },
        {
            title: "Counsellor",
            dataIndex: "counsellor",
            key: "counsellor",
            render: (_, record) => {
                const isLead = record.counsellorType === "lead";

                return (
                    <div>
                        <Text strong>{record.counsellor}</Text>

                        <br />

                        <Tag
                            style={{
                                marginTop: 4,
                                background: isLead ? "#EEF2FF" : "#F1F5F9",
                                color: isLead ? token.colorPrimary : token.colorTextSecondary,
                                border: "none",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            {isLead ? "Lead Counsellor" : "Counsellor"}
                        </Tag>
                    </div>
                );
            },
        },

        {
            title: "Date & Time",
            dataIndex: "date",
            key: "date",
            render: (_, record) => (
                <div>
                    <Text>{record.date}</Text>
                    <br />
                    <Text type="colorTextSecondary">{record.time}</Text>
                </div>
            ),
        },
        {
            title: "Mode",
            dataIndex: "mode",
            key: "mode",
            render: (mode) =>
                mode === "Online" ? (
                    <Tag
                        style={{
                            background: "#DBEAFE",
                            color: token.colorPrimary,
                            border: "none",
                            borderRadius: 6,
                        }}
                    >
                        Online
                    </Tag>
                ) : (
                    <Tag
                        style={{
                            background: "#F1F5F9",
                            color: token.colorTextBase,
                            border: "none",
                            borderRadius: 6,
                        }}
                    >
                        Offline
                    </Tag>
                ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === "Completed" ? (
                    <Tag
                        style={{
                            background: "#DCFCE7",
                            color: token.colorSuccess,
                            border: "none",
                            borderRadius: 6,
                        }}
                    >
                        Completed
                    </Tag>
                ) : (
                    <Tag
                        style={{
                            background: "#E0E7FF",
                            color: token.colorPrimary,
                            border: "none",
                            borderRadius: 6,
                        }}
                    >
                        Scheduled
                    </Tag>
                ),
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <Button
                    style={{
                        borderRadius: token.borderRadius,
                        fontWeight: 500,
                    }}
                >
                    View Details
                </Button>
            ),
        },
    ];

    /* ----------------- TABLE DATA ----------------- */
    const dataSource = [
        {
            key: "1",
            user: "Priya Sharma",
            sessionType: "Initial Counselling",
            counsellor: "Dr. Ramesh Gupta",
            isLead: true,
            date: "2026-01-15",
            time: "10:00 AM (60 mins)",
            mode: "Online",
            status: "Scheduled",
        },
        {
            key: "2",
            user: "Rajesh Kumar",
            sessionType: "Follow-up Session",
            counsellor: "Ms. Priya Menon",
            isLead: false,
            date: "2026-01-12",
            time: "2:00 PM (45 mins)",
            mode: "Online",
            status: "Completed",
        },
        {
            key: "3",
            user: "Anjali Verma",
            sessionType: "Report Review",
            counsellor: "Dr. Ramesh Gupta",
            isLead: true,
            date: "2026-01-16",
            time: "11:30 AM (60 mins)",
            mode: "Offline",
            status: "Scheduled",
        },
    ];

    return (
        <div
            style={{
                fontFamily: token.fontFamily,
            }}
        >
            {/* ================= HEADER ================= */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={3} style={{ marginBottom: 4 }}>
                        Counselling Sessions    
                    </Title>
                    {/* <Text type="secondary">
            Schedule and manage counselling sessions
          </Text> */}
                </Col>
                <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setRescheduleData(null); // new session
              setIsModalOpen(true);
            }}
          >
            Create Session
          </Button>
          </Col>
            </Row>

            {/* ================= STATS CARDS ================= */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {stats.map((item, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card
                            style={{
                                height: 140,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: token.borderRadius,
                                boxShadow: token.boxShadow,
                            }}
                        >
                            <Space
                                direction="vertical"
                                size={6}
                                style={{ width: "100%", height: "100%" }}
                            >
                                <Space
                                    style={{ width: "100%", justifyContent: "space-between" }}
                                >
                                    <Text type="colorTextSecondary">{item.title}</Text>
                                    {item.icon}
                                </Space>

                                <Title level={2} style={{ margin: 0 }}>
                                    {item.value}
                                </Title>

                                <div>
                                    {item.sub && (
                                        <Text type="colorTextSecondary" style={{ fontSize: 12 }}>
                                            {item.sub}
                                        </Text>
                                    )}
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ================= UPCOMING SESSIONS TABLE ================= */}
            <Card
                title="Upcoming Sessions (3)"
                style={{
                    borderRadius: token.borderRadius,
                    boxShadow: token.boxShadow,
                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </Card>


            <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <BookSessionModal
          rescheduleData={rescheduleData}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
        </div>
    );
};

export default SlotBooking;
