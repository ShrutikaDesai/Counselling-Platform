import React, { useState } from "react";
import {
  Card,
  Table,
  Typography,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Row,
  Col,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ExportOutlined,
  SearchOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";

const { Title, Text } = Typography;
const { Option } = Select;

const ExamManagements = () => {
  // ---------------- DATA ----------------
  const [examRecords, setExamRecords] = useState([
    {
      key: 1,
      userName: "Priya Sharma",
      program: "Engineering Career Path",
      status: "Awaiting Approval",
      completedDate: "2026-01-05",
      score: "85/100",
      link: "https://exam-link.com/1",
    },
    {
      key: 2,
      userName: "Rajesh Kumar",
      program: "Medical Career Guidance",
      status: "In Progress",
      completedDate: "-",
      score: "-",
      link: "https://exam-link.com/2",
    },
    {
      key: 3,
      userName: "Anjali Verma",
      program: "MBA Preparation",
      status: "Completed",
      completedDate: "2026-01-10",
      score: "78/100",
      link: "https://exam-link.com/3",
    },
    {
      key: 4,
      userName: "Vikram Singh",
      program: "Career Assessment",
      status: "Not Started",
      completedDate: "-",
      score: "-",
      link: "https://exam-link.com/4",
    },
  ]);

  // ---------------- STATES ----------------
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  // ---------------- APPROVE HANDLER ----------------
  const handleApproveExam = (key) => {
    setExamRecords((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: "Completed" } : item
      )
    );

    message.success("Exam approved successfully. Report unlocked!");
  };

  // ---------------- FILTER LOGIC ----------------
  const filteredData = examRecords.filter((item) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      item.userName.toLowerCase().includes(search) ||
      item.program.toLowerCase().includes(search);

    const matchesStatus = statusFilter
      ? item.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  // ---------------- STATUS TAG ----------------
  const renderStatus = (status) => {
    switch (status) {
      case "Completed":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Approved
          </Tag>
        );
      case "Awaiting Approval":
        return (
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            Awaiting Approval
          </Tag>
        );
      case "In Progress":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            In Progress
          </Tag>
        );
      default:
        return (
          <Tag icon={<MinusCircleOutlined />} color="default">
            Not Started
          </Tag>
        );
    }
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
       {
      title: "Sr. No",
      key: "srno",
      render: (_, __, index) => index + 1,
     },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Program",
      dataIndex: "program",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: renderStatus,
    },
    {
      title: "Completed Date",
      dataIndex: "completedDate",
      render: (date) => <Text type="secondary">{date}</Text>,
    },
    {
      title: "Score",
      dataIndex: "score",
      render: (score) => <Text strong>{score}</Text>,
    },
    {
      title: "Exam Link",
      dataIndex: "link",
      render: (link) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View Link <ExportOutlined />
        </a>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          {record.status === "Awaiting Approval" && (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleApproveExam(record.key)}
            >
              Approve Exam
            </Button>
          )}

          {record.status === "Completed" && (
            <Button disabled>Approved</Button>
          )}
        </Space>
      ),
    },
  ];

  // ---------------- JSX ----------------
  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Exam Management</Title>

      <Card
        style={{
          borderRadius: adminTheme.token.borderRadius,
          boxShadow: adminTheme.token.boxShadow,
        }}
      >
        <Title level={4} style={{ marginBottom: 20 }}>
          Records ({filteredData.length})
        </Title>

        {/* SEARCH + FILTER */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={12}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by user or program"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>

          <Col xs={24} md={6}>
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Completed">Approved</Option>
              <Option value="Awaiting Approval">Awaiting Approval</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Not Started">Not Started</Option>
            </Select>
          </Col>
        </Row>

        {/* TABLE WITH PAGINATION */}
        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  );
};

export default ExamManagements;
