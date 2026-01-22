import React, { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  message,
  Popconfirm,
  Space,
  Button,
  Input,
  DatePicker,
  Grid,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import CreateSlotModal from "../modals/CreateSlotModal";
import dayjs from "dayjs";

const { token } = adminTheme;
const { useBreakpoint } = Grid;

const counsellors = [
  { id: 1, name: "Dr. Ramesh Gupta" },
  { id: 2, name: "Ms. Priya Menon" },
  { id: 3, name: "Dr. Neha Sharma" },
];

const CreateSlot = () => {
  const screens = useBreakpoint();
  const [slots, setSlots] = useState([
    {
      key: 1,
      counsellor: "Dr. Ramesh Gupta",
      date: "2026-01-25",
      time: "10:00 AM",
      mode: "Online",
      duration: 60,
      status: "Available",
    },
    {
      key: 2,
      counsellor: "Ms. Priya Menon",
      date: "2026-01-26",
      time: "11:00 AM",
      mode: "Offline",
      duration: 45,
      status: "Available",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const handleCreate = (values) => {
    const newSlot = {
      key: Date.now(),
      counsellor: counsellors.find((c) => c.id === values.counsellor)?.name,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("hh:mm A"),
      mode: values.mode,
      duration: values.duration,
      status: "Available",
    };

    setSlots((prev) => [newSlot, ...prev]);
    setModalOpen(false);
    message.success("Slot created successfully!");
  };

  const handleEdit = (record) => {
    message.info(`Edit clicked for ${record.counsellor}`);
  };

  const handleDelete = (key) => {
    setSlots((prev) => prev.filter((slot) => slot.key !== key));
    message.success("Slot deleted successfully!");
  };

  // Filter slots based on search text and date
  const filteredSlots = slots.filter((slot) => {
    const search = searchText.toLowerCase();
    const matchesSearch =
      slot.counsellor.toLowerCase().includes(search) ||
      slot.date.toLowerCase().includes(search) ||
      slot.time.toLowerCase().includes(search) ||
      slot.mode.toLowerCase().includes(search) ||
      slot.duration.toString().includes(search) ||
      slot.status.toLowerCase().includes(search);

    const matchesDate = filterDate
      ? slot.date === dayjs(filterDate).format("YYYY-MM-DD")
      : true;

    return matchesSearch && matchesDate;
  });

  const columns = [
    { title: "Sr. No.", key: "sr", width: 60, render: (_, __, index) => index + 1 },
    { title: "Counsellor", dataIndex: "counsellor" },
    { title: "Date", dataIndex: "date" },
    { title: "Time", dataIndex: "time" },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (mode) =>
        mode === "Online" ? <Tag color="blue">Online</Tag> : <Tag>Offline</Tag>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (d) => `${d} mins`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={status === "Available" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space direction={screens.xs ? "vertical" : "horizontal"}>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: screens.xs ? "100%" : "auto" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this slot?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              style={{ width: screens.xs ? "100%" : "auto" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: token.fontFamily, padding: screens.md ? 24 : 12 }}>
      <Card
        title="Manage Counselling Slots"
        style={{
          borderRadius: token.borderRadius,
          boxShadow: token.boxShadow,
        }}
      >
        <Space
          direction={screens.xs ? "vertical" : "horizontal"}
          style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}
        >
          <Space direction={screens.xs ? "vertical" : "horizontal"}>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ width: screens.xs ? "100%" : 200 }}
            />
            <DatePicker
              placeholder="Filter by date"
              value={filterDate ? dayjs(filterDate) : null}
              onChange={(date) => setFilterDate(date)}
              style={{ width: screens.xs ? "100%" : 160 }}
            />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
            style={{ width: screens.xs ? "100%" : "auto" }}
          >
            Create Slot
          </Button>
        </Space>
      </Card>

      {/* Slot list outside the card */}
      <div style={{ marginTop: -24 }}>
        <Table
          columns={columns}
          dataSource={filteredSlots}
          pagination={{ pageSize: 5 }}
          scroll={{ x: screens.sm ? 0 : 900 }}
          style={{ borderRadius: token.borderRadius, overflowX: "auto" }}
        />
      </div>

      <CreateSlotModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default CreateSlot;
