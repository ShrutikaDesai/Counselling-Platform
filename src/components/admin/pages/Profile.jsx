import React, { useState } from "react";
import { Card, Row, Col, Typography, Avatar, Button, Space } from "antd";
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, SafetyOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import EditProfileModal from "../modals/EditProfileModal";

const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    mobile: "+91 9876543210",
    role: "Admin",
    joined: "2025-08-12",
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleSave = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <div style={{ padding: 16, minHeight: "100vh" }}>
      <Title level={2} style={{ marginBottom: 24, textAlign: "left" }}>
        My Profile
      </Title>

      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              borderRadius: adminTheme.token.borderRadius,
              boxShadow: adminTheme.token.boxShadow,
              overflow: "hidden",
              transition: "all 0.3s",
            }}
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${adminTheme.token.colorPrimary}, ${adminTheme.token.colorInfo})`,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                size={120}
                icon={<UserOutlined />}
                style={{
                  border: `4px solid ${adminTheme.token.colorBgContainer}`,
                  backgroundColor: "#000000",
                  marginBottom: 16,
                }}
              />
              <Title level={3} style={{ color: "#fff", marginBottom: 4 }}>
                {user.name}
              </Title>
              <Text style={{ color: "#E0E7FF", fontSize: 16 }}>{user.role}</Text>

              <Space style={{ marginTop: 16 }}>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  style={{ borderRadius: 8 }}
                  onClick={() => setIsEditModalVisible(true)}
                >
                  Edit
                </Button>
              </Space>
            </div>

            {/* Info Section */}
            <div
              style={{
                padding: 24,
                background: adminTheme.token.colorBgContainer,
                textAlign: "left",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>
                    <MailOutlined /> Email:
                  </Text>
                  <br />
                  <Text>{user.email}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>
                    <PhoneOutlined /> Mobile Number:
                  </Text>
                  <br />
                  <Text>{user.mobile}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>
                    <CalendarOutlined /> Joined:
                  </Text>
                  <br />
                  <Text>{new Date(user.joined).toLocaleDateString()}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>
                    <SafetyOutlined /> Role:
                  </Text>
                  <br />
                  <Text>{user.role}</Text>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        userData={user}
        onSave={handleSave}
      />
    </div>
  );
};

export default Profile;
