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
  Modal,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ExportOutlined,
  SearchOutlined,
  UnlockOutlined,
  BellOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";

const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const ExamManagements = () => {
  // ---------------- DATA ----------------
  const [examRecords, setExamRecords] = useState([
    {
      key: 1,
      userName: "Priya Sharma",
      program: "Engineering Career Path",
      status: "Awaiting Approval",
      completedDate: "2026-01-05",
    },
    {
      key: 2,
      userName: "Rajesh Kumar",
      program: "Medical Career Guidance",
      status: "In Progress",
      completedDate: "-",
    },
    {
      key: 3,
      userName: "Anjali Verma",
      program: "MBA Preparation",
      status: "Completed",
      completedDate: "2026-01-10",
    },
    {
      key: 4,
      userName: "Vikram Singh",
      program: "Career Assessment",
      status: "Not Started",
      completedDate: "-",
    },
  ]);

  // ---------------- STATES ----------------
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  // ---------------- APPROVE ----------------
  const handleApproveExam = (key) => {
    confirm({
      title: "Approve Exam?",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content:
        "Are you sure you want to approve this exam? The student's report will be unlocked.",
      centered: true,
      mask: true,
      closable: true,
      maskClosable: true,
      okText: "Yes, Approve",
      okType: "primary",
      okButtonProps: { style: { background: "#52c41a", borderColor: "#52c41a" } },
      cancelText: "Cancel",
      onOk() {
        setExamRecords((prev) =>
          prev.map((item) =>
            item.key === key
              ? {
                  ...item,
                  status: "Completed",
                  completedDate: new Date().toISOString().split("T")[0],
                }
              : item
          )
        );
        message.success("Exam approved successfully. Report unlocked!");
      },
    });
  };

  // ---------------- REJECT (WITH CONFIRM MODAL) ----------------
  const handleRejectExam = (key) => {
    confirm({
      title: "Reject Exam?",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content:
        "Are you sure you want to reject this exam? This action cannot be undone.",
      centered: true,
      mask: true,
      closable: true,
      maskClosable: true,
      okText: "Yes, Reject",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setExamRecords((prev) =>
          prev.map((item) =>
            item.key === key ? { ...item, status: "Rejected" } : item
          )
        );
        message.warning("Exam rejected successfully.");
      },
    });
  };

  // ---------------- SEND REMINDER ----------------
  const handleSendReminder = (key) => {
    confirm({
      title: "Send Reminder?",
      icon: <BellOutlined style={{ color: "#1E40AF" }} />,
      content:
        "Are you sure you want to send a reminder to the student about this exam?",
      centered: true,
      mask: true,
      closable: true,
      maskClosable: true,
      okText: "Yes, Send",
      okType: "primary",
      okButtonProps: { style: { background: "#1E40AF", borderColor: "#1E40AF" } },
      cancelText: "Cancel",
      onOk() {
        message.success("Reminder sent successfully to the student!");
      },
    });
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
      case "Rejected":
        return (
          <Tag icon={<MinusCircleOutlined />} color="error">
            Rejected
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
      render: (date) => <Text type="colorTextSecondary">{date}</Text>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          {(record.status === "Awaiting Approval" || record.status === "In Progress") && (
            <>
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                onClick={() => handleApproveExam(record.key)}
              >
                Approve Exam
              </Button>

              <Button
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => handleRejectExam(record.key)}
              >
                Reject
              </Button>
            </>
          )}

          {record.status === "Completed" && (
            <Button disabled type="primary">
              Approved
            </Button>
          )}

          {record.status === "Rejected" && (
            <Button disabled danger>
              Rejected
            </Button>
          )}

          {record.status === "Not Started" && (
            <Button
              type="default"
              icon={<BellOutlined />}
              onClick={() => handleSendReminder(record.key)}
            >
              Send Reminder
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // ---------------- JSX ----------------
  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>User Request List</Title>

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
              <Option value="Rejected">Rejected</Option>
              <Option value="Not Started">Not Started</Option>
            </Select>
          </Col>
        </Row>

        {/* TABLE */}
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
