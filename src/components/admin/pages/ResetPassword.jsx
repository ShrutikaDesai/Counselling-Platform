import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
    LockOutlined,
    UserOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";
import { resetPassword, clearResetPasswordState } from "../../../adminSlices/resetPasswordSlice";
import { clearForgotPasswordState } from "../../../adminSlices/forgotPasswordSlice";



const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ResetPassword = () => {
    const screens = useBreakpoint();
    const dispatch = useDispatch();
    const { loading, error, success, successMessage } = useSelector((state) => state.resetPassword);
    let { email } = useSelector((state) => state.forgotPassword);
    const [form] = Form.useForm();

    // Fallback to localStorage if Redux state is null
    if (!email) {
        email = localStorage.getItem("resetEmail");
    }


    const onFinish = (values) => {
        dispatch(
            resetPassword({
                email: email,
                new_password: values.new_password,
                confirm_password: values.confirm_password,
            })
        );
    };

    useEffect(() => {
        if (success) {
            message.success(
                successMessage || "Your password has been reset successfully. Please log in with your new password."
            );
            localStorage.removeItem("resetEmail");
            dispatch(clearResetPasswordState());
            dispatch(clearForgotPasswordState());
            
            // Delay redirect to show message
            setTimeout(() => {
                window.location.href = "/admin-login";
            },3500);
        }
    }, [success, successMessage, dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);



    // ================= PASSWORD VALIDATOR =================
    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject("Password is required");
        }

        if (value.length < 8) {
            return Promise.reject("Password must be at least 8 characters long");
        }

        if (!/[A-Z]/.test(value)) {
            return Promise.reject(
                "Password must contain at least one uppercase letter"
            );
        }

        if (!/[a-z]/.test(value)) {
            return Promise.reject(
                "Password must contain at least one lowercase letter"
            );
        }

        if (!/\d/.test(value)) {
            return Promise.reject(
                "Password must contain at least one number"
            );
        }

        if (!/[@$!%*?&]/.test(value)) {
            return Promise.reject(
                "Password must contain at least one special character (@$!%*?&)"
            );
        }

        return Promise.resolve();
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
                                style={{ backgroundColor: adminTheme.token.colorPrimary }}
                            />

                            <Title
                                level={screens.xs ? 3 : 2}
                                style={{ marginBottom: 0, textAlign: "center" }}
                            >
                                Reset Password
                            </Title>

                            <Text
                                style={{
                                    fontSize: screens.xs ? 16 : 18,
                                    fontWeight: 500,
                                    color: adminTheme.token.colorPrimary,
                                    textAlign: "center",
                                }}
                            >
                                Create a strong new password
                            </Text>
                        </Space>

                        <Divider style={{ margin: "20px 0" }} />

                        {/* ================= FORM ================= */}
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                            {/* NEW PASSWORD */}
                            <Form.Item
                                label={<Text strong>New Password</Text>}
                                name="new_password"
                                hasFeedback
                                rules={[
                                    {
                                        validator: validatePassword,
                                    },
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined />}
                                    placeholder="Enter new password"
                                    style={{ height: 48 }}
                                />
                            </Form.Item>

                            {/* CONFIRM PASSWORD */}
                            <Form.Item
                                label={<Text strong>Confirm Password</Text>}
                                name="confirm_password"
                                dependencies={["new_password"]}
                                hasFeedback
                                rules={[
                                    { required: true, message: "Please confirm your password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject(
                                                    "Confirm password is required"
                                                );
                                            }

                                            if (value !== getFieldValue("new_password")) {
                                                return Promise.reject(
                                                    "Passwords do not match"
                                                );
                                            }

                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined />}
                                    placeholder="Re-enter new password"
                                    style={{ height: 48 }}
                                />
                            </Form.Item>

                            {/* SUBMIT */}
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
                                    Reset Password
                                </Button>

                            </Form.Item>

                            {/* FOOTER */}
                            <Row justify="center">
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

export default ResetPassword;
