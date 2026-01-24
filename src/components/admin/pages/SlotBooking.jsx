import React, { useState, useEffect } from "react";
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
  Input,
  Select,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import adminTheme from "../../../theme/adminTheme";
import BookSessionModal from "../../student/modals/BookSessionModal";

const { Title, Text } = Typography;
const { Option } = Select;
const { token } = adminTheme;

const SlotBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [modeFilter, setModeFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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

  /* ----------------- TABLE DATA ----------------- */
  const dataSource = [
    {
      key: "1",
      user: "Priya Sharma",
      sessionType: "Initial Counselling",
      counsellors: [
        { name: "Dr. Ramesh Gupta", type: "lead" },
        { name: "Ms. Priya Menon", type: "normal" },
      ],
      date: "2026-01-15",
      time: "10:00 AM (60 mins)",
      mode: "Online",
      status: "Scheduled",
    },
    {
      key: "2",
      user: "Rajesh Kumar",
      sessionType: "Follow-up Session",
      counsellors: [{ name: "Ms. Priya Menon", type: "normal" }],
      date: "2026-01-12",
      time: "2:00 PM (60 mins)",
      mode: "Online",
      status: "Completed",
    },
    {
      key: "3",
      user: "Anjali Verma",
      sessionType: "Report Review",
      counsellors: [{ name: "Dr. Ramesh Gupta", type: "lead" }],
      date: "2026-01-16",
      time: "11:30 AM (60 mins)",
      mode: "Offline",
      status: "Scheduled",
    },
  ];

  /* ----------------- FILTER + SORT LOGIC ----------------- */
  const filteredData = dataSource
    .filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesMode = modeFilter ? item.mode === modeFilter : true;
      const matchesStatus = statusFilter
        ? item.status === statusFilter
        : true;
      const matchesDate = dateFilter
        ? dayjs(item.date).isSame(dateFilter, "day")
        : true;

      return matchesSearch && matchesMode && matchesStatus && matchesDate;
    })
    // Optional: newest first
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

  // ✅ Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, modeFilter, statusFilter, dateFilter]);

  /* ----------------- TABLE COLUMNS ----------------- */
  const columns = [
    {
      title: "Sr. No.",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "user",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Counsellors",
      render: (_, record) => (
        <>
          {record.counsellors.map((c, index) => (
            <div key={index} style={{ marginBottom: 4 }}>
              <Text strong>{c.name}</Text>
              <br />
              <Tag
                style={{
                  background: c.type === "lead" ? "#EEF2FF" : "#F1F5F9",
                  color:
                    c.type === "lead"
                      ? token.colorPrimary
                      : token.colorTextSecondary,
                  border: "none",
                  borderRadius: 6,
                }}
              >
                {c.type === "lead" ? "Lead Counsellor" : "Normal Counsellor"}
              </Tag>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Date & Time",
      render: (_, record) => (
        <>
          <Text>{record.date}</Text>
          <br />
          <Text type="colorTextSecondary">{record.time}</Text>
        </>
      ),
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (mode) => (
        <Tag
          style={{
            background: mode === "Online" ? "#DBEAFE" : "#F1F5F9",
            color:
              mode === "Online"
                ? token.colorPrimary
                : token.colorTextBase,
            border: "none",
            borderRadius: 6,
          }}
        >
          {mode}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          style={{
            background:
              status === "Completed" ? "#DCFCE7" : "#E0E7FF",
            color:
              status === "Completed"
                ? token.colorSuccess
                : token.colorPrimary,
            border: "none",
            borderRadius: 6,
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            icon={<EyeOutlined />}
            style={{ borderRadius: token.borderRadius }}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            type="primary"
            style={{ borderRadius: token.borderRadius }}
            onClick={() => {
              setRescheduleData(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      {/* HEADER */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        style={{ marginBottom: 24 }}
      >
        <Col xs={24} md={12}>
          <Title level={3}>Counselling Sessions</Title>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setRescheduleData(null);
              setIsModalOpen(true);
            }}
          >
            Create Session
          </Button>
        </Col>
      </Row>

      {/* STATS */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              style={{
                height: 140,
                borderRadius: token.borderRadius,
                boxShadow: token.boxShadow,
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Text type="colorTextSecondary" style={{ fontSize: 17 }}>
                    {item.title}
                  </Text>
                  {item.icon}
                </Space>
                <Title level={2} style={{ margin: 0 }}>
                  {item.value}
                </Title>
                {item.sub && (
                  <Text type="colorTextSecondary" style={{ fontSize: 12 }}>
                    {item.sub}
                  </Text>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* TABLE */}
      <Card>
        <Title level={5} style={{ margin: 10 }}>
          Upcoming Session ({filteredData.length})
        </Title>

        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={10}>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Mode"
              allowClear
              style={{ width: "100%" }}
              onChange={setModeFilter}
            >
              <Option value="Online">Online</Option>
              <Option value="Offline">Offline</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              allowClear
              style={{ width: "100%" }}
              onChange={setStatusFilter}
            >
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Select date"
              allowClear
              onChange={(date) => setDateFilter(date)}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          scroll={{ x: 900 }}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false

          }}
        />
      </Card>

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={950}
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
