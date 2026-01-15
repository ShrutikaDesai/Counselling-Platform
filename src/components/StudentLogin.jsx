import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const StudentLogin = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Login Values:", values);
     navigate("/student/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <Row>
          {/* LEFT PANEL */}
          <Col
            xs={0}
            md={10}
            style={{
              background: "linear-gradient(180deg,#5f72ff,#9b23ea)",
              color: "#fff",
              padding: "60px 40px",
            }}
          >
            <Title style={{ color: "#fff" }}>
              Welcome Back 🎉
            </Title>

            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
              Login to continue your personalized learning and career journey.
            </Text>

            <ul style={{ marginTop: 30, lineHeight: 2 }}>
              <li>✔ Career Dashboard</li>
              <li>✔ Book Expert Sessions</li>
              <li>✔ Track Student Progress</li>
           </ul>
          </Col>

          {/* RIGHT PANEL – FORM */}
          <Col xs={24} md={14} style={{ padding: "60px 40px" }}>
            <Title level={3}>Student Login</Title>
            <Text type="secondary">
              Enter your credentials to access your account
            </Text>

            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 30 }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="********"
                  size="large"
                />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                   float:"right",
                }}
              >
                <Text
                  type="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Text>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  borderRadius: 30,
                  height: 48,
                  fontSize: 16,
                }}
              >
                Login
              </Button>

              <Divider />

              <Text style={{ display: "block", textAlign: "center" }}>
                Don’t have an account?{" "}
                <Text
                  type="primary"
                   style={{
                   cursor: "pointer",
                   color: "#1890ff",        
                   textDecoration: "underline",
                    }}
                  onClick={() => navigate("/register")}
                >
                  Register 
                </Text>
              </Text>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StudentLogin;
