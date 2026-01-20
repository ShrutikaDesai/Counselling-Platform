import React, { useState } from "react";
import { Row, Col, Card, Typography, Table, Tag, Button } from "antd";
import {
  FileOutlined,
  UnlockOutlined,
  LockOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ----------------- Dummy Data -----------------
const stats = [
  { title: "Total Reports", value: 142, icon: <FileOutlined style={{ color: "#4F46E5" }} /> },
  { title: "Unlocked", value: 118, icon: <UnlockOutlined style={{ color: "#16A34A" }} /> },
  { title: "Locked", value: 16, icon: <LockOutlined style={{ color: "#374151" }} /> },
  { title: "Pending Upload", value: 8, icon: <UploadOutlined style={{ color: "#F97316" }} /> },
];

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

// ----------------- Table Columns -----------------
const columns = [
  { title: "User Name", dataIndex: "name", key: "name" },
  { title: "Program", dataIndex: "program", key: "program" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "#D1D5DB"; // default gray
      let icon = null;
      if (status === "Unlocked") {
        color = "#1f2120"; icon = <UnlockOutlined style={{ marginRight: 4 }} />;
      } else if (status === "Locked") {
        color = "#1f2120"; icon = <LockOutlined style={{ marginRight: 4 }} />;
      } else if (status === "Pending Upload") {
        color = "#1f2120"; icon = <UploadOutlined style={{ marginRight: 4 }} />;
      }
      return <Tag color={color} icon={icon}>{status}</Tag>;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (text) => {
      let color = "#1f2120";
      if (text === "Fully Paid") color = "#1f2120";
      else if (text === "Partial Paid") color = "#1f2120";
      else if (text === "Verification Pending") color = "#1f2120";
      else if (text === "Pending") color = "#1f2120";
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "Exam Status",
    dataIndex: "examStatus",
    key: "examStatus",
    render: (text) => {
      let color = "#1f2120";
      if (text === "Completed") color = "#1f2120";
      else if (text === "Pending") color = "#1f2120";
      else if (text === "Not Started") color = "#1f2120";
      return <Tag color={color}>{text}</Tag>;
    },
  },
  { title: "Uploaded Date", dataIndex: "uploadedDate", key: "uploadedDate" },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      record.status === "Pending Upload" ? (
        <Button icon={<UploadOutlined />} type="primary">Upload</Button>
      ) : (
        <Button icon={<EyeOutlined />}>View</Button>
      )
    ),
  },
];

const Reports = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Report Management</Title>
      <Text type="secondary">Upload and manage career guidance reports</Text>

      {/* ----------------- Stats Cards ----------------- */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card style={{ borderRadius: 12, textAlign: "center" }}>
              <Text style={{ fontSize: 14 }}>{stat.title}</Text>
              <div style={{ marginTop: 8 }}>{React.cloneElement(stat.icon, { style: { fontSize: 24 } })}</div>
              <Title level={3} style={{ marginTop: 8 }}>{stat.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ----------------- Reports Table ----------------- */}
      <Card style={{ marginTop: 24, borderRadius: 12, overflowX: "auto" }}>
        <Title level={5}>Report Records ({reportData.length})</Title>
        <Table
          columns={columns}
          dataSource={reportData}
          pagination={false}
          scroll={{ x: "max-content" }}
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default Reports;
