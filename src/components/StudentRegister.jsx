import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  DatePicker,
  Select,
  Divider,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import adminTheme from "../theme/adminTheme";

const { Title, Text } = Typography;
const { Option } = Select;

const StudentRegister = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <ConfigProvider theme={adminTheme}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          background:
            "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",
        }}
      >
        <Card
          bordered={false}
          style={{
            width: "100%",
            maxWidth: 980,
            borderRadius: 24,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #1E40AF, #6b85db)",
            boxShadow: "0 30px 70px rgba(30, 64, 175, 0.35)",
          }}
        >
          <Row>
            {/* LEFT INFO PANEL */}
            <Col
              xs={24}
              md={10}
              style={{
                color: "#FFFFFF",
                padding: "70px 32px",
              }}
            >
              <Title
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                Start Your Journey 🎓
              </Title>

              <Text
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                Create your account to access career assessments, expert
                counselling, and a personalized student dashboard.
              </Text>

              <ul
                style={{
                  marginTop: 30,
                  paddingLeft: 20,
                  lineHeight: "30px",
                }}
              >
                <li>✔ Career Assessment</li>
                <li>✔ Expert Counselling</li>
                <li>✔ Progress Tracking</li>
              </ul>
            </Col>

            {/* RIGHT FORM PANEL */}
            <Col
              xs={24}
              md={14}
              style={{
                padding: "48px 40px",
                background: "#FFFFFF",
                borderRadius: "0 24px 24px 0",
              }}
            >
              <Title level={3} style={{ marginBottom: 4 }}>
                Student Registration
              </Title>

              <Text type="colorTextSecondary">
                Fill in the details to create your account
              </Text>

              <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ marginTop: 28 }}
              >
                <Divider orientation="left">Student Details</Divider>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Student Name"
                      name="studentName"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="dob"
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ type: "email", required: true }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Mobile Number (Optional)"
                      name="mobile"
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Class"
                      name="class"
                      rules={[{ required: true }]}
                    >
                      <Select
                        size="large"
                        placeholder="Select Class"
                      >
                        {[...Array(12)].map((_, i) => (
                          <Option key={i + 5}>
                            Class {i + 5}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Stream" name="stream">
                      <Select
                        size="large"
                        placeholder="Optional"
                      >
                        <Option>Science</Option>
                        <Option>Commerce</Option>
                        <Option>Arts</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Divider orientation="left">Parent Details</Divider>

                <Form.Item
                  label="Parent Name"
                  name="parentName"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Parent Mobile"
                      name="parentMobile"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Parent Email"
                      name="parentEmail"
                    >
                      <Input
                        prefix={<MailOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, min: 8 }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              value === getFieldValue("password")
                            )
                              return Promise.resolve();
                            return Promise.reject(
                              "Passwords do not match"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  style={{
                    height: 50,
                    borderRadius: 30,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Create Account
                </Button>

                <Divider />

                <Text
                  style={{
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Already have an account?{" "}
                  <Text
                    type="primary"
                    style={{
                      cursor: "pointer",
                      color: "#1890ff",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Login
                  </Text>
                </Text>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default StudentRegister;
