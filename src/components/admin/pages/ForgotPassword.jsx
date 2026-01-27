import React, {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
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
import { MailOutlined, UserOutlined, SafetyOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import {sendResetLink,clearForgotPasswordState,} from "../../../adminSlices/forgotPasswordSlice";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ForgotPassword = () => {

  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      dispatch(clearForgotPasswordState());
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearForgotPasswordState());
    }
  }, [error, dispatch]);


  const onFinish = (values) => {
    dispatch(sendResetLink(values));
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
            {/* HEADER */}
            <Space
              direction="vertical"
              align="center"
              size={10}
              style={{ width: "100%", marginBottom: 12 }}
            >
              <Avatar
                size={screens.xs ? 72 : 96}
                icon={<UserOutlined />}
                style={{ backgroundColor: adminTheme.token.colorPrimary }}
              />

              <Title
                level={screens.xs ? 3 : 2}
                style={{ marginBottom: 0, textAlign: "center" }}
              >
                Forgot Password
              </Title>

              <Text
                style={{
                  fontSize: screens.xs ? 16 : 18,
                  fontWeight: 500,
                  color: adminTheme.token.colorPrimary,
                  textAlign: "center",
                }}
              >
                Enter your email to reset your password
              </Text>
            </Space>

            <Divider style={{ margin: "20px 0" }} />

            {/* FORM */}
            <Form layout="vertical" onFinish={onFinish}>
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
                  placeholder="yourname@example.com"
                  style={{ height: 48 }}
                  allowClear
                />
              </Form.Item>

              <Form.Item style={{ marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  icon={<SafetyOutlined />}
                  style={{ height: 52, borderRadius: 10 }}
                >
                  Send Reset Link
                </Button>
              </Form.Item>

              <Row justify="center" style={{ marginTop: 16 }}>
                <Text
                  style={{
                    color: adminTheme.token.colorPrimary,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => (window.location.href = "/admin-login")}
                >
                  Back to Login
                </Text>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default ForgotPassword;
