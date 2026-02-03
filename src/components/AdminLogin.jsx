import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Grid,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import adminTheme from "../theme/adminTheme";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../adminSlices/authSlice";


const { Title, Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

const AdminLogin = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = React.useState(null);
  const { loading, error, success, successMessage, user } = useSelector((state) => state.auth);

useEffect(() => {
  if (success) {
    message.success(successMessage);
    navigate("/admin/dashboard");
  }
}, [success, successMessage, navigate]);


useEffect(() => {
  if (error) {
    message.error(error);
  }
}, [error]);


  const onFinish = (values) => {
    const payload = { ...values };

    // When role is 'counsellor', put the selected counsellor type into the `role` field
    // so backend receives role: 'lead' or 'normal' (instead of role: 'counsellor' + counsellor_type)
    if (values.role === "counsellor" && values.counsellor_type) {
      payload.role = values.counsellor_type;
      delete payload.counsellor_type;
    }

    console.log("Login Payload:", payload);
    dispatch(loginUser(payload));
  };

  return (
    <ConfigProvider theme={adminTheme}>
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: "100vh",
          padding: screens.xs ? "16px" : "0",
          background: `linear-gradient(135deg, ${adminTheme.token.colorPrimary}20, ${adminTheme.token.colorInfo}30)`,
        }}
      >
        <Col xs={24} sm={22} md={16} lg={10} xl={8}>
          <Card
            bordered={false}
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: adminTheme.token.boxShadow,
              background: "rgba(255,255,255,0.96)",
              padding: screens.xs ? "8px" : "16px",
            }}
          >
            {/* ================= HEADER ================= */}
            <Space
              direction="vertical"
              align="center"
              size={10}
              style={{ width: "100%", marginBottom: 12 }}
            >
              <Avatar
                size={screens.xs ? 72 : 96}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: adminTheme.token.colorPrimary,
                }}
              />

              <Title
                level={screens.xs ? 3 : 2}
                style={{ marginBottom: 0, textAlign: "center" }}
              >
                Login Portal
              </Title>

              <Text
                style={{
                  fontSize: screens.xs ? 16 : 20,
                  fontWeight: 700,
                  color: adminTheme.token.colorPrimary,
                  textAlign: "center",
                }}
              >
                Admin / Employee / Counsellor
              </Text>
            </Space>

            <Divider style={{ margin: "20px 0" }} />

            {/* ================= FORM ================= */}
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<Text strong>Email Address</Text>}
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
                  style={{ height: 48 }}
                />
              </Form.Item>

              <Form.Item
                label={<Text strong>Password</Text>}
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 8, message: "Minimum 8 characters required" },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  style={{ height: 48 }}
                />
              </Form.Item>

              <Form.Item
                label={<Text strong>Login As</Text>}
                name="role"
                rules={[
                  { required: true, message: "Please select your role" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select your role"
                  onChange={(value) => {
                    setSelectedRole(value);
                    // Clear counsellor type if role changed away
                    if (value !== "counsellor") {
                      form.resetFields(["counsellor_type"]);
                    }
                  }}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="superadmin">Superadmin</Option>
                  <Option value="employee">Employee</Option>
                  <Option value="counsellor">Counsellor</Option>
                </Select>
              </Form.Item>

              {/* Show this only when counsellor is selected */}
              {selectedRole === "counsellor" && (
                <Form.Item
                  label={<Text strong>Counsellor Type</Text>}
                  name="counsellor_type"
                  rules={[{ required: true, message: "Please select counsellor type" }]}
                >
                  <Select size="large" placeholder="Select counsellor type">
                    <Option value="lead_counsellor">Lead Counsellor</Option>
                    <Option value="counsellor">Counsellor</Option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item style={{ marginTop: 28 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  icon={<SafetyOutlined />}
                  style={{
                    height: 52,
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 10,
                  }}
                >
                  Login
                </Button>
              </Form.Item>

              {/* ================= FOOTER ================= */}
              <Row justify="end">
                <Text
                  style={{
                    color: adminTheme.token.colorPrimary,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </Text>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default AdminLogin;
