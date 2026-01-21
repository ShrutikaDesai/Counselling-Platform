import React, { useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  message,
} from "antd";
import {
  FileOutlined,
  UnlockOutlined,
  LockOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import ViewReportModal from "../modals/ViewReportModal";

const { Title, Text } = Typography;
const { Option } = Select;

/* ----------------- STATS DATA ----------------- */
const stats = [
  {
    title: "Total Reports",
    value: 142,
    icon: <FileOutlined style={{ color: adminTheme.token.colorPrimary }} />,
  },
  {
    title: "Unlocked",
    value: 118,
    icon: <UnlockOutlined style={{ color: adminTheme.token.colorSuccess }} />,
  },
  {
    title: "Locked",
    value: 16,
    icon: <LockOutlined style={{ color: adminTheme.token.colorError }} />,
  },
  {
    title: "Pending Upload",
    value: 8,
    icon: <UploadOutlined style={{ color: adminTheme.token.colorWarning }} />,
  },
];

/* ----------------- TABLE DATA ----------------- */
const reportData = [
  {
    key: 1,
    name: "Priya Sharma",
    program: "Engineering Career Path",
    status: "Unlocked",
    paymentStatus: "Fully Paid",
    examStatus: "Completed",
    uploadedDate: "2026-01-06",
  },
  {
    key: 2,
    name: "Rajesh Kumar",
    program: "Medical Career Guidance",
    status: "Locked",
    paymentStatus: "Partial Paid",
    examStatus: "Completed",
    uploadedDate: "2026-01-11",
  },
  {
    key: 3,
    name: "Anjali Verma",
    program: "MBA Preparation",
    status: "Locked",
    paymentStatus: "Verification Pending",
    examStatus: "Pending",
    uploadedDate: "-",
  },
  {
    key: 4,
    name: "Vikram Singh",
    program: "Career Assessment",
    status: "Pending Upload",
    paymentStatus: "Pending",
    examStatus: "Not Started",
    uploadedDate: "-",
  },
];

/* ----------------- COLOR MAPS ----------------- */
const statusColorMap = {
  Unlocked: adminTheme.token.colorSuccess,
  Locked: adminTheme.token.colorError,
  "Pending Upload": adminTheme.token.colorWarning,
};

const paymentStatusColorMap = {
  "Fully Paid": adminTheme.token.colorSuccess,
  "Partial Paid": adminTheme.token.colorWarning,
  "Verification Pending": adminTheme.token.colorInfo,
  Pending: adminTheme.token.colorError,
};

const examStatusColorMap = {
  Completed: adminTheme.token.colorSuccess,
  Pending: adminTheme.token.colorWarning,
  "Not Started": adminTheme.token.colorTextSecondary,
};

const statusIconMap = {
  Unlocked: <UnlockOutlined />,
  Locked: <LockOutlined />,
  "Pending Upload": <UploadOutlined />,
};

/* ----------------- COMPONENT ----------------- */
const ReportsManagement = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /* -------- FILTER STATES -------- */
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState(null);
  const [examFilter, setExamFilter] = useState(null);

  /* -------- FILTER LOGIC -------- */
  const filteredData = useMemo(() => {
    const search = searchText.toLowerCase();

    return reportData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search);

      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      const matchesPayment = paymentFilter
        ? item.paymentStatus === paymentFilter
        : true;
      const matchesExam = examFilter ? item.examStatus === examFilter : true;

      return matchesSearch && matchesStatus && matchesPayment && matchesExam;
    });
  }, [searchText, statusFilter, paymentFilter, examFilter]);

  /* ----------------- TABLE COLUMNS ----------------- */
  const columns = [
    {
      title: "Sr. No",
      key: "srno",
      render: (_, __, index) => index + 1, // auto serial number
      responsive: ["xs", "sm", "md", "lg", "xl"], // responsive column
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Program",
      dataIndex: "program",
      key: "program",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={statusColorMap[status]}
          icon={statusIconMap[status]}
          style={{ borderRadius: 20, padding: "2px 10px" }}
        >
          {status}
        </Tag>
      ),
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => (
        <Tag color={paymentStatusColorMap[text]} style={{ borderRadius: 20 }}>
          {text}
        </Tag>
      ),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Exam Status",
      dataIndex: "examStatus",
      key: "examStatus",
      render: (text) => (
        <Tag color={examStatusColorMap[text]} style={{ borderRadius: 20 }}>
          {text}
        </Tag>
      ),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Uploaded Date",
      dataIndex: "uploadedDate",
      key: "uploadedDate",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          {record.status === "Pending Upload" ? (
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => {
                setSelectedReport(record);
                setModalMode("edit");
                setOpenViewModal(true);
              }}
            >
              Upload
            </Button>
          ) : (
            <>
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  setSelectedReport(record);
                  setModalMode("view");
                  setOpenViewModal(true);
                }}
              >
                View
              </Button>

              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedReport(record);
                  setModalMode("edit");
                  setOpenViewModal(true);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  /* ----------------- BULK UPLOAD HANDLER ----------------- */
  const handleBulkUpload = () => {
    if (!selectedRowKeys.length) {
      message.warning("Please select at least one report to upload.");
      return;
    }
    // Pass selected rows to modal
    const selectedReports = filteredData.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    setSelectedReport(selectedReports);
    setModalMode("bulkUpload");
    setOpenViewModal(true);
  };

  /* ----------------- ROW SELECTION ----------------- */
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
    getCheckboxProps: (record) => ({
      disabled: record.status !== "Pending Upload", // only Pending Upload selectable
    }),
  };

  return (
    <div style={{ padding: "16px" }}>
      <Title level={3}>Report Management</Title>

      {/* ----------------- STATS ----------------- */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card style={{ textAlign: "center" }}>
              <Text>{stat.title}</Text>
              <div style={{ fontSize: 24, marginTop: 8 }}>{stat.icon}</div>
              <Title level={3}>{stat.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ----------------- FILTERS + BULK UPLOAD ----------------- */}
      <Card style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search name, program, status..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Select
              placeholder="Status"
              allowClear
              style={{ width: "100%" }}
              onChange={setStatusFilter}
            >
              <Option value="Unlocked">Unlocked</Option>
              <Option value="Locked">Locked</Option>
              <Option value="Pending Upload">Pending Upload</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Select
              placeholder="Payment Status"
              allowClear
              style={{ width: "100%" }}
              onChange={setPaymentFilter}
            >
              <Option value="Fully Paid">Fully Paid</Option>
              <Option value="Partial Paid">Partial Paid</Option>
              <Option value="Verification Pending">
                Verification Pending
              </Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Select
              placeholder="Exam Status"
              allowClear
              style={{ width: "100%" }}
              onChange={setExamFilter}
            >
              <Option value="Completed">Completed</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Not Started">Not Started</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={3}>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleBulkUpload}
              disabled={
                filteredData.filter((item) => item.status === "Pending Upload")
                  .length === 0
              }
              block
            >
              Bulk Upload 
            </Button>
          </Col>
        </Row>

        <br />

        {/* ----------------- TABLE ----------------- */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      {/* ----------------- MODAL ----------------- */}
      <ViewReportModal
        open={openViewModal}
        onCancel={() => setOpenViewModal(false)}
        data={selectedReport}
        mode={modalMode}
      />
    </div>
  );
};

export default ReportsManagement;
