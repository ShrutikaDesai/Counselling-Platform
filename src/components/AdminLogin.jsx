import React from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Avatar,
  Divider,
  Space,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

import antdTheme from "../theme/antdTheme";

const { Title, Text } = Typography;
const { Option } = Select;

const AdminLogin = () => {
  const onFinish = (values) => {
    console.log("Login Values:", values);
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: "100vh",
          background: antdTheme.token.colorBgLayout,
        }}
      >
        <Col>
          <Card
            hoverable
            style={{
              width: 440,
              boxShadow: antdTheme.token.boxShadow,
              borderRadius: 12,
            }}
          >
            {/* Header */}
            <Space
              direction="vertical"
              align="center"
              size="small"
              style={{ width: "100%" }}
            >
              <Avatar size={80} icon={<UserOutlined />} />

              <Title level={4} style={{ marginBottom: 0 }}>
                Admin / Employee / Counsellor Login
              </Title>

              <Text type="secondary">
                Enter your credentials to access the system
              </Text>
            </Space>

            <Divider />

            {/* Form */}
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 8, message: "Minimum 8 characters required" },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="********"
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[
                  { required: true, message: "Role selection is mandatory" },
                ]}
              >
                <Select size="large" placeholder="Select your role">
                  <Option value="admin">Admin</Option>
                  <Option value="employee">Employee</Option>
                  <Option value="counsellor">Counsellor</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<SafetyOutlined />}
                >
                  Login
                </Button>
              </Form.Item>

              <Row justify="end">
                <Text type="link">Forgot Password?</Text>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default AdminLogin;
