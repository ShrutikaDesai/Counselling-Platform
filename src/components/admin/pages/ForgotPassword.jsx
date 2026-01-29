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
import { MailOutlined, UserOutlined, SafetyOutlined, LockOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import {sendResetLink, verifyOtp, clearForgotPasswordState, resetOtpState, setEmailInState} from "../../../adminSlices/forgotPasswordSlice";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ForgotPassword = () => {

  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, successMessage, error, otpSent, otpVerified } = useSelector((state) => state.forgotPassword);
  const [form] = Form.useForm();

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      if (otpVerified) {
        navigate("/resetpassword", { replace: true });
      } else {
        dispatch(clearForgotPasswordState());
      }
    }
  }, [successMessage, dispatch, otpVerified, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearForgotPasswordState());
    }
  }, [error, dispatch]);

  const onFinishEmail = (values) => {
    localStorage.setItem("resetEmail", values.email);
    dispatch(setEmailInState(values.email));
    dispatch(sendResetLink({ email: values.email }));
  };

  const onFinishOtp = (values) => {
    localStorage.setItem("resetEmail", values.email);
    dispatch(setEmailInState(values.email));
    dispatch(verifyOtp({
      email: values.email,
      otp: values.otp,
    }));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(resetOtpState());
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
            {/* ============ HEADER ============ */}
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
                {otpSent ? "Enter the OTP sent to your email" : "Enter your email to reset your password"}
              </Text>
            </Space>

            <Divider style={{ margin: "20px 0" }} />

            {/* ============ FORM ============ */}
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={otpSent ? onFinishOtp : onFinishEmail}
            >
              {/* EMAIL FIELD */}
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
                  disabled={otpSent}
                />
              </Form.Item>

              {/* OTP FIELD - Shows after email is submitted */}
              {otpSent && (
                <Form.Item
                  label={<Text strong>OTP Code</Text>}
                  name="otp"
                  rules={[
                    { required: true, message: "OTP is required" },
                    { pattern: /^\d{4,6}$/, message: "OTP must be 4-6 digits" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Enter OTP"
                    style={{ height: 48 }}
                    maxLength={6}
                    allowClear
                  />
                </Form.Item>
              )}

              {/* SUBMIT BUTTON */}
              <Form.Item style={{ marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  icon={otpSent ? <SafetyOutlined /> : <SafetyOutlined />}
                  style={{ height: 52, borderRadius: 10 }}
                >
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </Button>
              </Form.Item>

              {/* BACK BUTTON */}
              <Row justify="center" style={{ marginTop: 16 }}>
                <Text
                  style={{
                    color: adminTheme.token.colorPrimary,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => otpSent ? handleReset() : (window.location.href = "/admin-login")}
                >
                  {otpSent ? "Change Email" : "Back to Login"}
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
