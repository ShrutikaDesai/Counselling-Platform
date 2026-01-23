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
  Popconfirm,
  Space,
} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  UnlockOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import UserProfileModal from "../modals/UserProfileModal";
import AddUserModal from "../modals/AddUserModal";

const { Title, Text } = Typography;
const { Option } = Select;

const UserList = () => {
  const usersData = [
    {
      key: 1,
      firstName: "Priya",
      lastName: "Sharma",
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
      firstName: "Rajesh",
      lastName: "Kumar",
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
      firstName: "Anjali",
      lastName: "Verma",
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


  const [users, setUsers] = useState(usersData);
  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState(null);
  const [examFilter, setExamFilter] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  // ---------------- FILTERED DATA ----------------
  const filteredData = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const search = searchText.toLowerCase();

    const matchesSearch =
      fullName.includes(search) ||
      user.program?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.package?.toLowerCase().includes(search);

    const matchesPayment = paymentFilter ? user.paymentStatus === paymentFilter : true;
    const matchesExam = examFilter ? user.examStatus === examFilter : true;

    return matchesSearch && matchesPayment && matchesExam;
  });


  // TABLE COLUMNS (ALL columns visible)
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
          <Text strong>{`${record.firstName || ""} ${record.lastName || ""}`}</Text>
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
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setViewModalOpen(true);
            }}
          >
            View
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setAddEditModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() =>
              setUsers((prev) => prev.filter((u) => u.key !== record.key))
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ADD USER HANDLER
  const handleAddUser = () => {
    setSelectedUser(null);
    setAddEditModalOpen(true);
  };

  return (
    <div style={{ padding: 1 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>Users</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            Add User
          </Button>
        </Col>
      </Row>

      <Card
        style={{
          borderRadius: adminTheme.token.borderRadius,
          boxShadow: adminTheme.token.boxShadow,
          marginTop: 10,
        }}
      >
        {/* FILTERS */}
        <Row gutter={[16, 16]} wrap={true} style={{ marginBottom: 16 }}>
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

        {/* TABLE */}
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      {/* VIEW PROFILE MODAL */}
      <UserProfileModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        user={selectedUser}
      />

      {/* ADD / EDIT USER MODAL */}
      <AddUserModal
        open={addEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        user={selectedUser}
        onSave={(newUser) => {
          setUsers((prev) => {
            const index = prev.findIndex((u) => u.key === newUser.key);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = newUser;
              return updated;
            } else {
              return [newUser, ...prev];
            }
          });
          setAddEditModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserList;
