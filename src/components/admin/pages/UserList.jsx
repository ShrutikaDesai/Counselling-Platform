import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Card,
  Tag,
  Button,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import UserProfileModal from "../modals/UserProfileModal";


const { Title, Text } = Typography;
const { Option } = Select;

const UserList = () => {
  const usersData = [
    {
      key: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      program: "Engineering Career Path",
      package: "Premium Package",
      paymentStatus: "Fully Paid",
      paymentAmount: "₹25,000",
      examStatus: "Completed",
      reportStatus: "Unlocked",
      sessions: "3 completed",
    },
    {
      key: 2,
      name: "Rajesh Kumar",
      email: "rajesh.k@email.com",
      program: "Medical Career Guidance",
      package: "Standard Package",
      paymentStatus: "Partial Paid",
      paymentAmount: "₹7,500 / ₹15,000",
      examStatus: "Pending",
      reportStatus: "Locked",
      sessions: "1 completed",
    },
    {
      key: 3,
      name: "Anjali Verma",
      email: "anjali.v@email.com",
      program: "MBA Preparation",
      package: "Basic Package",
      paymentStatus: "Verification Pending",
      paymentAmount: "₹10,000",
      examStatus: "Pending",
      reportStatus: "Locked",
      sessions: "0 completed",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState(null);
  const [examFilter, setExamFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const filteredData = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.program.toLowerCase().includes(searchText.toLowerCase());

    const matchesPayment = paymentFilter
      ? user.paymentStatus === paymentFilter
      : true;

    const matchesExam = examFilter ? user.examStatus === examFilter : true;

    return matchesSearch && matchesPayment && matchesExam;
  });

  const columns = [
      {
    title: "Sr. No",
    key: "srno",
    render: (_, __, index) => index + 1,
  },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div>
          <Text strong>{record.name}</Text>
          <br />
          <Text type="colorTextSecondary">{record.email}</Text>
        </div>
      ),
    },
    {
      title: "Program / Package",
      key: "program",
      render: (_, record) => (
        <div>
          <Text strong>{record.program}</Text>
          <br />
          <Text type="colorTextSecondary">{record.package}</Text>
        </div>
      ),
    },
    {
      title: "Payment Status",
      key: "payment",
      render: (_, record) => {
        const color =
          record.paymentStatus === "Fully Paid"
            ? "success"
            : record.paymentStatus === "Partial Paid"
            ? "warning"
            : "processing";

        return (
          <div>
            <Tag color={color}>{record.paymentStatus}</Tag>
            <br />
            <Text type="colorTextSecondary">{record.paymentAmount}</Text>
          </div>
        );
      },
    },
    {
      title: "Exam Status",
      dataIndex: "examStatus",
      key: "examStatus",
      render: (status) => (
        <Tag
          icon={status === "Completed" ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          color={status === "Completed" ? "success" : "warning"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Report",
      dataIndex: "reportStatus",
      key: "report",
      render: (status) => (
        <Tag
          icon={status === "Unlocked" ? <UnlockOutlined /> : <LockOutlined />}
          color={status === "Unlocked" ? "success" : "default"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
    },
  {
  title: "Actions",
  key: "actions",
  render: (_, record) => (
    <Button
      icon={<EyeOutlined />}
      style={{
        borderRadius: adminTheme.token.borderRadius,
        width: "100%",
      }}
      onClick={() => {
        setSelectedUser(record);
        setIsModalOpen(true);
      }}
    >
      View Profile
    </Button>
  ),
},

  ];

  // -------- RESPONSIVE SCROLL --------
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: 1 }}>
      <Title level={3}>Users</Title>

      <Card
        style={{
          borderRadius: adminTheme.token.borderRadius,
          boxShadow: adminTheme.token.boxShadow,
          marginTop:30,
        }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Search user or program..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>

          <Col xs={12} sm={12} md={6}>
            <Select
              placeholder="Payment Status"
              value={paymentFilter}
              onChange={setPaymentFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Fully Paid">Fully Paid</Option>
              <Option value="Partial Paid">Partial Paid</Option>
              <Option value="Verification Pending">Verification Pending</Option>
            </Select>
          </Col>

          <Col xs={12} sm={12} md={6}>
            <Select
              placeholder="Exam Status"
              value={examFilter}
              onChange={setExamFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Completed">Completed</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          scroll={isMobile ? { x: "max-content" } : undefined} // Only scroll on mobile
        />
      </Card>

<UserProfileModal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  user={selectedUser}
/>



    </div>
  );
};

export default UserList;
