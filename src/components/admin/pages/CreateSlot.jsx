import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
  Row,
  Col,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import CreateSlotModal from "../modals/CreateSlotModal";
import dayjs from "dayjs";
import { createCounsellingSlot } from "../../../adminSlices/counsellingSlotSlice";

const { token } = adminTheme;
const { Title, Text } = Typography;
const { Option } = Select;

const counsellorsMaster = [
  { id: 1, name: "Dr. Ramesh Gupta" },
  { id: 2, name: "Ms. Priya Menon" },
  { id: 3, name: "Dr. Neha Sharma" },
];

const CreateSlot = () => {
  const [slots, setSlots] = useState([
    {
      key: 1,
      counsellors: [
        { name: "Dr. Ramesh Gupta", type: "lead" },
        { name: "Ms. Priya Menon", type: "normal" },
      ],
      date: "2026-01-25",
      time: "10:00 AM",
      mode: "Online",
      duration: 60,
      status: "Available",
    },
    {
      key: 2,
      counsellors: [{ name: "Dr. Radha Patil", type: "lead" }],
      date: "2026-07-25",
      time: "10:00 AM",
      mode: "Online",
      duration: 60,
      status: "Available",
    },
    {
      key: 3,
      counsellors: [
        { name: "Dr. Rama Patil", type: "lead" },
        { name: "Ms. Supriya Patil", type: "normal" },
      ],
      date: "2026-09-25",
      time: "10:00 AM",
      mode: "Online",
      duration: 60,
      status: "Available",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [filterMode, setFilterMode] = useState(null);
  const dispatch = useDispatch();

  
const handleCreate = (values) => {

  const payload = {
    lead_counsellor: values.lead_counsellor,
    normal_counsellor: values.normalCounsellor || null,
    date: values.date
      ? dayjs.isDayjs(values.date)
        ? values.date.format("YYYY-MM-DD")
        : values.date
      : null,
    start_time: values.start_time
      ? dayjs.isDayjs(values.start_time)
        ? values.start_time.format("HH:mm:ss")
        : values.start_time
      : null,
    mode: values.mode?.toLowerCase(),
    duration_minutes: values.duration,
  };

  dispatch(createCounsellingSlot(payload))
    .unwrap()
    .then(() => {
      message.success("Slot created successfully");
      setModalOpen(false);
    })
    .catch((err) => {
      message.error(err || "Failed to create slot");
    });
};



  const handleEdit = (record) => {
    setEditingSlot(record);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (record) => {
    setEditingSlot(record);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = (key) => {
    setSlots((prev) => prev.filter((slot) => slot.key !== key));
    message.success("Slot deleted successfully!");
  };

  const filteredSlots = slots.filter((slot) => {
    const search = searchText.toLowerCase();
    const counsellorMatch = slot.counsellors?.some((c) =>
      c.name.toLowerCase().includes(search)
    );

    const matchesOther =
      slot.date.toLowerCase().includes(search) ||
      slot.time.toLowerCase().includes(search) ||
      slot.mode.toLowerCase().includes(search);

    const matchesDate = filterDate
      ? slot.date === dayjs(filterDate).format("YYYY-MM-DD")
      : true;

    const matchesMode = filterMode ? slot.mode === filterMode : true;

    return (counsellorMatch || matchesOther) && matchesDate && matchesMode;
  });

  const columns = [
    {
      title: "Sr. No.",
      render: (_, __, index) => index + 1,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Counsellors",
      render: (_, record) =>
        record.counsellors?.length ? (
          record.counsellors.map((c, i) => (
            <div key={i}>
              <Text strong>{c.name}</Text>
              <br />
              <Tag color={c.type === "lead" ? "blue" : "default"}>
                {c.type === "lead" ? "Lead" : "Normal"}
              </Tag>
            </div>
          ))
        ) : (
          <Text type="secondary">Not assigned</Text>
        ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Date & Time",
      render: (_, r) => (
        <>
          {r.date} <br />
          {r.time} ({r.duration} mins)
        </>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (m) => <Tag>{m}</Tag>,
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            size="large"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
           
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this slot?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button size="large" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title level={3}>Manage Counselling Slots</Title>
        </Col>
        <Col xs={24} sm={24} md={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingSlot(null);
              setModalMode("create");
              setModalOpen(true);
            }}
          >
            Create Slot
          </Button>
        </Col>
      </Row><br></br>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} md={8}>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by mode"
              allowClear
              style={{ width: "100%" }}
              value={filterMode}
              onChange={setFilterMode}
            >
              <Option value="Online">Online</Option>
              <Option value="Offline">Offline</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <DatePicker
              placeholder="Filter by date"
              style={{ width: "100%" }}
              value={filterDate}
              onChange={setFilterDate}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredSlots}
          rowKey="key"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 768 }}
        />
      </Card>

    <CreateSlotModal
  open={modalOpen}
  editingSlot={editingSlot}
  mode={modalMode}
  onCancel={() => {
    setModalOpen(false);
    setEditingSlot(null);
    setModalMode("create");
  }}
  onCreate={handleCreate}
/>

    </div>
  );
};

export default CreateSlot;
