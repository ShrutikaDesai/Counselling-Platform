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
  LinkOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import dayjs from "dayjs";
import AddExamModal from "../modals/AddExamModal";

const { token } = adminTheme;
const { Title, Text } = Typography;
const { Option } = Select;

const ExamList = () => {
  const [exams, setExams] = useState([
    {
      key: 1,
      name: "Mathematics Final Exam",
      program: "Mathematics",
      date: "2026-02-10",
      duration: 120,
      status: "Scheduled",
      link: "https://example.com/math-final",
    },
    {
      key: 2,
      name: "Physics Midterm",
      program: "Physics",
      date: "2026-03-15",
      duration: 90,
      status: "Scheduled",
      link: "https://example.com/physics-midterm",
    },
    {
      key: 3,
      name: "Chemistry Test",
      program: "Chemistry",
      date: "2026-04-05",
      duration: 60,
      status: "Completed",
      link: "https://example.com/chemistry-test",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [filterProgram, setFilterProgram] = useState(null);

  const handleCreate = (values) => {
    const examData = {
      name: values.name,
      program: values.program,
      date: values.date.format("YYYY-MM-DD"),
      duration: values.duration,
      status: values.status || "Scheduled",
      link: values.link || "",
    };

    if (modalMode === "edit" && editingExam) {
      setExams((prev) =>
        prev.map((exam) =>
          exam.key === editingExam.key ? { ...exam, ...examData } : exam
        )
      );
      message.success("Exam updated successfully!");
    } else {
      setExams((prev) => [{ key: Date.now(), ...examData }, ...prev]);
      message.success("Exam created successfully!");
    }

    setModalOpen(false);
    setEditingExam(null);
    setModalMode("create");
  };

  const handleEdit = (record) => {
    setEditingExam(record);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (record) => {
    setEditingExam(record);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = (key) => {
    setExams((prev) => prev.filter((exam) => exam.key !== key));
    message.success("Exam deleted successfully!");
  };

  const filteredExams = exams.filter((exam) => {
    const search = searchText.toLowerCase();
    const matchesSearch =
      exam.name.toLowerCase().includes(search) ||
      exam.program.toLowerCase().includes(search);

    const matchesDate = filterDate
      ? exam.date === dayjs(filterDate).format("YYYY-MM-DD")
      : true;

    const matchesProgram = filterProgram ? exam.program === filterProgram : true;

    return matchesSearch && matchesDate && matchesProgram;
  });

  const columns = [
    {
      title: "Sr. No.",
      render: (_, __, index) => index + 1,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Exam Name",
      dataIndex: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Program",
      dataIndex: "program",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Date & Duration",
      render: (_, record) => (
        <>
          {record.date} <br />
          {record.duration} mins
        </>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => <Tag color={s === "Scheduled" ? "blue" : "green"}>{s}</Tag>,
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Link",
      dataIndex: "link",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Link
          </a>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
      responsive: ["sm", "md", "lg", "xl"],
    },
 {
  title: "Actions",
  render: (_, record) => (
    <Space>
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
        title="Delete this exam?"
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
    <div style={{ padding: 20 }}>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title level={3}>Manage Exams</Title>
        </Col>
        <Col xs={24} sm={24} md={12} style={{ textAlign: "right" }}>
          <Button
  type="primary"
  icon={<PlusOutlined />}
  onClick={() => {
    setEditingExam(null); // clear previous exam
    setModalMode("create"); // set mode
    setModalOpen(true); // open modal
  }}
>
  Add Exam
</Button>

        </Col>
      </Row>
      <br />

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} md={8}>
            <Input
              placeholder="Search exam..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by program"
              allowClear
              style={{ width: "100%" }}
              value={filterProgram}
              onChange={setFilterProgram}
            >
              {exams.map((e) => (
                <Option key={e.program} value={e.program}>
                  {e.program}
                </Option>
              ))}
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
          dataSource={filteredExams}
          rowKey="key"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 900 }}
        />
      </Card>

      <AddExamModal
        open={modalOpen}
        editingExam={editingExam}
        mode={modalMode}
        onCancel={() => {
          setModalOpen(false);
          setEditingExam(null);
          setModalMode("create");
        }}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default ExamList;
