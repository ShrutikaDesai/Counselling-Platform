import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Button,
  Divider,
  Form,
  Input,
  Select,
  Row,
  Col,
  Card,
  Upload,
  Empty,
} from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import adminTheme from "../../../theme/adminTheme";

const { Title } = Typography;
const { Option } = Select;

const ViewReportModal = ({ open, onCancel, data, mode }) => {
  const [form] = Form.useForm();
  const [previewUrl, setPreviewUrl] = useState("");

  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const isBulkMode = mode === "bulkUpload";

  useEffect(() => {
    if (data && !isBulkMode) {
      form.setFieldsValue(data);
      if (data.pdfUrl) setPreviewUrl(data.pdfUrl);
    }
  }, [data, form, isBulkMode]);

  if (!data) return null;

  const handleUpload = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    return false;
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="90%"
      style={{ maxWidth: 700 }}
      title={
        isBulkMode
          ? "Bulk Upload Reports"
          : isEditMode
          ? "Edit Report"
          : "Report Details"
      }
    >
      {/* ================= FORM: Edit/View ================= */}
      {!isBulkMode && (
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Form form={form} layout="vertical">
            <Row gutter={[16, 0]}>
              <Col xs={24}>
                <Form.Item label="Student Name" name="name">
                  <Input readOnly={isViewMode ? true : !isEditMode} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Program" name="program">
                  <Input readOnly={isViewMode ? true : !isEditMode} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Status" name="status">
                  {isEditMode ? (
                    <Select>
                      <Option value="Unlocked">Unlocked</Option>
                      <Option value="Locked">Locked</Option>
                      <Option value="Pending Upload">Pending Upload</Option>
                    </Select>
                  ) : (
                    <Input readOnly />
                  )}
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Payment Status" name="paymentStatus">
                  {isEditMode ? (
                    <Select>
                      <Option value="Fully Paid">Fully Paid</Option>
                      <Option value="Partial Paid">Partial Paid</Option>
                      <Option value="Pending">Pending</Option>
                    </Select>
                  ) : (
                    <Input readOnly />
                  )}
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Uploaded Date" name="uploadedDate">
                  <Input readOnly />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Exam Status" name="examStatus">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )}

      <Divider />

      {/* ================= PDF UPLOAD/DOWNLOAD ================= */}
      <Title level={5}>
        <FilePdfOutlined />{" "}
        {isBulkMode
          ? "Upload Reports"
          : isEditMode
          ? "Upload Report"
          : "Uploaded Report"}
      </Title>

      <Row gutter={[16, 16]} align="middle">
        {/* PDF Preview */}
        <Col xs={24} md={isBulkMode ? 24 : 16} style={{ display: "flex", justifyContent: "center" }}>
          {previewUrl ? (
            <Card
              style={{
                width: "100%",
                maxWidth: 420,
                height: 180,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9",
                padding: 10,
              }}
              bodyStyle={{ padding: 0 }}
            >
              <iframe
                src={previewUrl}
                title="PDF Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: 16,
                }}
              />
            </Card>
          ) : (
            <Empty description="No report uploaded yet" />
          )}
        </Col>

        {/* Action Buttons */}
        <Col xs={24} md={isBulkMode ? 24 : 8}>
          {/* Upload Button: Edit & Bulk */}
          {(isEditMode || isBulkMode) && (
            <Upload showUploadList={false} beforeUpload={handleUpload} multiple={isBulkMode}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                block
                style={{
                  height: 48,
                  marginTop: isBulkMode ? 16 : 0,
                  backgroundColor: adminTheme.token.colorPrimary,
                  borderRadius: adminTheme.token.borderRadius,
                }}
              >
                {isBulkMode ? "Upload Selected Reports" : "Upload Report"}
              </Button>
            </Upload>
          )}

          {/* Download Button: View Only */}
          {isViewMode && previewUrl && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              block
              style={{
                height: 48,
                marginTop: 16,
                backgroundColor: adminTheme.token.colorPrimary,
                borderRadius: adminTheme.token.borderRadius,
              }}
            >
              Download Report
            </Button>
          )}
        </Col>
      </Row>

      {/* Footer: Only for edit/view if needed */}
      {!isBulkMode && !isViewMode && (
        <>
          <Divider />
          <div style={{ textAlign: "right" }}>
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              {isEditMode ? "Cancel" : "Close"}
            </Button>

            {isEditMode && (
              <Button
                type="primary"
                onClick={() => {
                  console.log("Updated Values:", form.getFieldsValue());
                  onCancel();
                }}
                style={{
                  backgroundColor: adminTheme.token.colorPrimary,
                  borderRadius: adminTheme.token.borderRadius,
                }}
              >
                Save Changes
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewReportModal;
