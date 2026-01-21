import React from "react";
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Upload,
    Button,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";

const { Option } = Select;

const UploadPaymentModal = ({ open, onClose }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Uploaded Payment:", values);
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Upload Payment"
            okText="Submit Payment"
            onOk={() => form.submit()}
            width={600}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                {/* Student */}
                <Form.Item
                    label="Select Student"
                    name="student"
                    rules={[{ required: true, message: "Please select student" }]}
                >
                    <Select placeholder="Select student">
                        <Option value="Priya Sharma">Priya Sharma</Option>
                        <Option value="Rajesh Kumar">Rajesh Kumar</Option>
                        <Option value="Anjali Verma">Anjali Verma</Option>
                    </Select>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        {/* Amount */}
                        <Form.Item
                            label="Amount Paid"
                            name="amount"
                            rules={[{ required: true, message: "Enter amount" }]}
                        >
                            <Input placeholder="₹ Amount" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        {/* Payment Method */}
                        <Form.Item
                            label="Payment Method"
                            name="paymentMethod"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Select method">
                                <Option value="UPI">UPI</Option>
                                <Option value="Cash">Cash</Option>
                                <Option value="Card">Card</Option>
                                <Option value="Bank Transfer">Bank Transfer</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Transaction ID */}
                <Form.Item
                    label="Transaction ID"
                    name="transactionId"
                    rules={[{ required: true, message: "Enter transaction ID" }]}
                >
                    <Input placeholder="Transaction ID" />
                </Form.Item>

                {/* Payment Date */}
                <Form.Item
                    label="Payment Date"
                    name="paymentDate"
                    rules={[{ required: true }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {/* Upload Receipt */}
                <Form.Item
                    label="Upload Receipt / Screenshot"
                    name="receipt"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                    rules={[{ required: true, message: "Upload receipt" }]}
                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        accept="image/*,.pdf"
                    >
                        <Button icon={<UploadOutlined />}>
                            Upload File
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UploadPaymentModal;
