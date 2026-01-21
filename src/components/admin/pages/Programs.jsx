import React, { useState } from "react";
import { Row, Col, Card, Typography, Button, Table, Tag, Input } from "antd";
import {
  BookOutlined,
  TeamOutlined,
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  ReadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import AddProgramModal from "../modals/AddProgramModal";
import AddPackageModal from "../modals/AddPackageModal";

const { Title, Text } = Typography;

const Programs = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [programData, setProgramData] = useState([
    { key: 1, name: "Engineering Career Path", duration: "3 Months", sessions: 12, users: 45, description: "Engineering guidance" },
    { key: 2, name: "Medical Career Guidance", duration: "2 Months", sessions: 8, users: 54, description: "Medical guidance" },
  ]);
  const [packageData, setPackageData] = useState([
    { key: 1, name: "Basic", program: "Engineering Career Path", price: "₹10,000", users: 45 },
    { key: 2, name: "Standard", program: "Engineering Career Path", price: "₹15,000", users: 68 },
    { key: 3, name: "Premium", program: "Engineering Career Path", price: "₹25,000", users: 32 },
    { key: 4, name: "Standard", program: "Medical Career Guidance", price: "₹18,000", users: 54 },
  ]);

  const stats = [
    { title: "Total Programs", value: programData.length, icon: <ReadOutlined style={{ color: "#4F46E5" }} /> },
    { title: "Total Packages", value: packageData.length, icon: <BookOutlined style={{ color: "#4F46E5" }} /> },
    { title: "Total Enrolled", value: programData.reduce((a,b)=>a+b.users,0), icon: <TeamOutlined style={{ color: "#16A34A" }} /> },
    { title: "Revenue (Monthly)", value: "₹8.2L", icon: <DollarOutlined style={{ color: "#16A34A" }} /> },
  ];

  const programColumns = [
     {
    title: "Sr. No",
    key: "srno",
    render: (_, __, index) => index + 1,
  },
    { title: "Program Name", dataIndex: "name", render: (text) => <Text strong>{text}</Text> },
    { title: "Duration", dataIndex: "duration" },
    { title: "Sessions", dataIndex: "sessions" },
    { title: "Enrolled Users", dataIndex: "users" },
    { title: "Status", render: () => <Tag color="success">Active</Tag> },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            setEditingProgram(record);
            setModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const packageColumns = [
      {
    title: "Sr. No",
    key: "srno",
    render: (_, __, index) => index + 1,
  },
    { title: "Package Name", dataIndex: "name", render: (text) => <Text strong>{text}</Text> },
    { title: "Program", dataIndex: "program" },
    { title: "Price", dataIndex: "price" },
    { title: "Active Users", dataIndex: "users" },
    { title: "Status", render: () => <Tag color="success">Active</Tag> },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            setEditingPackage(record);
            setModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  // Search filter on all fields
  const filteredData =
    activeTab === "packages"
      ? packageData.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : programData.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          )
        );

  return (
    <div style={{ padding: "16px" }}>
      <Title level={3}>Programs & Packages</Title>

      {/* Stats Cards */}
      <Row gutter={[16,16]} style={{ marginTop:16 }}>
        {stats.map((item,index)=>(
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card hoverable style={{ borderRadius:16, textAlign:"center" }} bodyStyle={{padding:16}}>
              <Text style={{ fontSize:14, color:"#6B7280"}}>{item.title}</Text>
              <div style={{ marginTop:8 }}>{React.cloneElement(item.icon,{style:{fontSize:28}})}</div>
              <Title level={2} style={{marginTop:8, fontSize:22}}>{item.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tabs & Create Button */}
      <Row justify="space-between" align="middle" style={{ marginTop:24, flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", background:"#F1F5FF", padding:4, borderRadius:999, flexWrap:"wrap" }}>
          {["programs","packages"].map(tab=>(
            <div
              key={tab}
              onClick={()=>setActiveTab(tab)}
              style={{
                padding:"6px 16px",
                borderRadius:999,
                cursor:"pointer",
                fontWeight:600,
                color: activeTab===tab?"#4F46E5":"#1F2937",
                background: activeTab===tab?"#FFFFFF":"transparent",
                border: activeTab===tab?"2px solid #4F46E5":"2px solid transparent",
                transition:"all 0.3s ease",
                marginBottom:4
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={()=>{
            if(activeTab==="packages") setEditingPackage(null);
            else setEditingProgram(null);
            setModalVisible(true);
          }}
        >
          Create {activeTab==="packages"?"Package":"Program"}
        </Button>
      </Row>

      {/* Search + Table */}
      <Card style={{ marginTop:16, borderRadius:16, overflowX:"auto" }}>
        <Row justify="space-between" align="middle" style={{ marginBottom:16, flexWrap:"wrap", gap:16 }}>
          <Title level={5} style={{ margin:0, fontSize:16 }}>
            {activeTab==="packages"?`All Packages (${filteredData.length})`:`All Programs (${filteredData.length})`}
          </Title>

          <Input
            placeholder={activeTab==="packages"?"Search package or program":"Search program"}
            prefix={<SearchOutlined />}
            allowClear
            onChange={e=>setSearchText(e.target.value)}
            style={{ width:"100%", maxWidth:260, borderRadius:8 }}
          />
        </Row>

        <Table
          columns={activeTab==="packages"?packageColumns:programColumns}
          dataSource={filteredData}
          pagination={{ pageSize:5, showSizeChanger:false }}
          scroll={{ x:"max-content" }}
        />
      </Card>

      {/* Program Modal */}
      {activeTab==="programs" && (
        <AddProgramModal
          visible={modalVisible}
          onClose={()=>{setModalVisible(false); setEditingProgram(null);}}
          onSubmit={(values)=>{
            if(editingProgram){
              setProgramData(programData.map(p=>p.key===editingProgram.key?{...p,...values}:p));
            } else {
              setProgramData([...programData,{key:programData.length+1,...values}]);
            }
            setModalVisible(false);
            setEditingProgram(null);
          }}
          initialValues={editingProgram}
        />
      )}

      {/* Package Modal */}
      {activeTab==="packages" && (
        <AddPackageModal
          visible={modalVisible}
          onClose={()=>{setModalVisible(false); setEditingPackage(null);}}
          onSubmit={(values)=>{
            if(editingPackage){
              setPackageData(packageData.map(p=>p.key===editingPackage.key?{...p,...values}:p));
            } else {
              setPackageData([...packageData,{key:packageData.length+1,...values}]);
            }
            setModalVisible(false);
            setEditingPackage(null);
          }}
          initialValues={editingPackage}
          programs={programData} // pass programs for dropdown
        />
      )}
    </div>
  );
};

export default Programs;
