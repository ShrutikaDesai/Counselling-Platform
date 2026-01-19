import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Typography,
  Card,
  Space,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import adminTheme from "../../../theme/adminTheme";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const Enquiry = () => {

  const enquiriesData = [
    {
      key: 1,
      name: "Priya Sharma",
      phone: "9876543210",
      email: "priya@example.com",
      program: "Engineering",
      source: "Website",
      date: "2026-01-19",
      status: "New",
    },
    {
      key: 2,
      name: "Rajesh Kumar",
      phone: "9876543211",
      email: "rajesh@example.com",
      program: "Medical",
      source: "WhatsApp",
      date: "2026-01-18",
      status: "Contacted",
    },
    {
      key: 3,
      name: "Anjali Verma",
      phone: "9876543212",
      email: "anjali@example.com",
      program: "Commerce",
      source: "Call",
      date: "2026-01-17",
      status: "Converted",
    },
    {
      key: 4,
      name: "Vikram Singh",
      phone: "9876543213",
      email: "vikram@example.com",
      program: "Arts",
      source: "Walk-In",
      date: "2026-01-16",
      status: "New",
    },
  ];


  const sourceColorMap = {
    Website: adminTheme.token.colorPrimary,
    WhatsApp: adminTheme.token.colorSuccess,
    Call: adminTheme.token.colorWarning,
    "Walk-In": adminTheme.token.colorInfo,
  };

  const [searchText, setSearchText] = useState("");
 const [statusFilter, setStatusFilter] = useState(null);
const [sourceFilter, setSourceFilter] = useState(null);

  const [dateFilter, setDateFilter] = useState(null);


  const filteredEnquiries = enquiriesData.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchText.toLowerCase()) ||
      enquiry.program.toLowerCase().includes(searchText.toLowerCase()) ||
      enquiry.source.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter
      ? enquiry.status === statusFilter
      : true;

    const matchesSource = sourceFilter
      ? enquiry.source === sourceFilter
      : true;

    const matchesDate = dateFilter
      ? dayjs(enquiry.date).isSame(dateFilter, "day")
      : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSource &&
      matchesDate
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text strong style={{ color: adminTheme.token.colorTextBase }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <Text>{record.phone}</Text>
          <br />
          <Text>{record.email}</Text>
        </div>
      ),
    },
    {
      title: "Program",
      dataIndex: "program",
      key: "program",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text) => (
        <Tag color={sourceColorMap[text]}>{text}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Converted"
            ? adminTheme.token.colorSuccess
            : status === "Contacted"
            ? adminTheme.token.colorWarning
            : adminTheme.token.colorPrimary;

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="primary"
          style={{
            borderRadius: adminTheme.token.borderRadius,
            backgroundColor: adminTheme.token.colorPrimary,
          }}
        >
          Convert to User
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <Space direction="vertical" size="small">
        <Title level={3}>Enquiry & Leads</Title>
       
      </Space>

      {/* Filters */}
      <Card
        style={{
          marginTop: 16,
          borderRadius: adminTheme.token.borderRadius,
          boxShadow: adminTheme.token.boxShadow,
        }}
      >
        <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
  <Input
    prefix={<SearchOutlined style={{ color: adminTheme.token.colorTextSecondary }} />}
    placeholder="Search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    allowClear
  />
</Col>


          <Col xs={12} md={4}>
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="New">New</Option>
              <Option value="Contacted">Contacted</Option>
              <Option value="Converted">Converted</Option>
            </Select>
          </Col>

          <Col xs={12} md={4}>
            <Select
              placeholder="Source"
              value={sourceFilter}
              onChange={setSourceFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Website">Website</Option>
              <Option value="WhatsApp">WhatsApp</Option>
              <Option value="Call">Call</Option>
              <Option value="Walk-In">Walk-In</Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <DatePicker
              placeholder="Filter by Date"
              value={dateFilter}
              onChange={(date) => setDateFilter(date)}
              style={{ width: "100%" }}
              allowClear
            />
          </Col>
        </Row>

        {/* Table */}
        <Table
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={filteredEnquiries}
          pagination={{ pageSize: 5 }}
          rowClassName={() => "enquiry-row"}
          scroll={{ x: "max-content" }}
        />
      </Card>

      {/* Hover Effect */}
      <style jsx>{`
        .enquiry-row:hover {
          background-color: ${adminTheme.components.Table.rowHoverBg};
        }
      `}</style>
    </div>
  );
};

export default Enquiry;
