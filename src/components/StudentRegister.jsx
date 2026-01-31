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
  Checkbox,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const StudentRegister = () => {
  const navigate = useNavigate();


  const onFinish = (values) => {
    console.log(values);
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
          {/* LEFT SIDE */}
          <Col
            xs={24}
            md={10}
            style={{
              background: "linear-gradient(180deg,#5f72ff,#9b23ea)",
              color: "#fff",
              padding: "60px 12px",
              textAlign: "center",
            }}
          >

            <Title style={{ color: "#fff" }}>
              Start Your Learning Journey 🎓
            </Title>

            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
              Register now to explore personalized career guidance, expert
              mentoring, and smart assessments designed for students.
            </Text>
            <ul
              style={{
                marginTop: 20,
                paddingLeft: 60,
                //  justifyContent: "center",
                listStyle: "none",
                lineHeight: "26px",
                textAlign: "left",
              }}
            >
              <li style={{ marginBottom: 8 }}>✔ Career Assessment</li>
              <li style={{ marginBottom: 8 }}>✔ Expert Counselling</li>
              <li>✔ Progress Tracking</li>
            </ul>

          </Col>

          {/* RIGHT SIDE – FORM */}
          <Col xs={24} md={14} style={{ padding: "50px 40px" }}>
            <Title level={3}>Student Registration</Title>
            <Text type="secondary">
              Fill in the details to create your account
            </Text>

            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 30 }}
            >
              <Divider orientation="left">Student Details</Divider>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Student Name"
                    name="studentName"
                    rules={[{ required: true }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[{ required: true }]}
                  >
                    <DatePicker style={{ width: "100%" }} />
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
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mobile Number (Optional)"
                    name="mobile"
                  // rules={[{ required: true }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
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
                    <Select placeholder="Select Class">
                      {[...Array(12)].map((_, i) => (
                        <Option key={i + 5}>Class {i + 5}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Stream" name="stream">
                    <Select placeholder="Optional">
                      <Option>Science</Option>
                      <Option>Commerce</Option>
                      <Option>Arts</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* ✅ CITY FIELD */}


              <Divider orientation="left">Parent Details</Divider>

              <Form.Item
                label="Parent Name"
                name="parentName"
                rules={[{ required: true }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Parent Mobile"
                    name="parentMobile"
                    rules={[{ required: true }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Parent Email" name="parentEmail">
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>

              </Row>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter City Name" />
              </Form.Item>
              {/* 🔐 Password section (no Security heading) */}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, min: 8 }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
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
                          if (!value || value === getFieldValue("password"))
                            return Promise.resolve();
                          return Promise.reject("Passwords do not match");
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item>
                <Checkbox>
                  I agree to the <a>Terms</a> & <a>Privacy Policy</a>
                </Checkbox>
              </Form.Item> */}



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
                Create Account
              </Button>

              <Divider />

              <Text style={{ display: "block", textAlign: "center" }}>
                Have an account? {" "}
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
  );
};

export default StudentRegister;
