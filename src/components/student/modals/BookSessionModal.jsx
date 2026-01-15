import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Radio,
  DatePicker,
  Button,
  Space,
  Tag,
  Divider,
  Avatar,
  Select,
} from "antd";
import {
  VideoCameraOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const BookSessionModal = ({ rescheduleData, closeModal }) => {
  const [mode, setMode] = useState("online");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [slotFilter, setSlotFilter] = useState("all");


  const counsellors = [
    { id: 1, name: "Dr. Ananya Sharma" },
    { id: 2, name: "Mr. Rahul Verma" },
    { id: 3, name: "Ms. Priya Singh" },
  ];

  const slots = [
    { time: "09:00 AM - 10:00 AM", available: true },
    { time: "10:00 AM - 11:00 AM", available: false },
    { time: "11:00 AM - 12:00 PM", available: true },
    { time: "02:00 PM - 03:00 PM", available: true },
    { time: "04:00 PM - 05:00 PM", available: false },
  ];

  const filteredSlots = slots.filter((slot) => {
    if (slotFilter === "available") return slot.available;
    if (slotFilter === "booked") return !slot.available;
    return true;
  });


  // Prefill for reschedule
  useEffect(() => {
    if (rescheduleData) {
      setMode(rescheduleData.mode);
      setSelectedCounsellor(rescheduleData.counsellor);
      setSelectedSlot(rescheduleData.time);
    }
  }, [rescheduleData]);

  return (
    <div style={{ padding: "16px 12px" }}>
      <Title level={3}>
        {rescheduleData
          ? "Reschedule Counselling Session"
          : "Book Counselling Session"}
      </Title>

      <Text type="secondary">
        {rescheduleData
          ? "Update your session date and time"
          : "Select your preferred date, counsellor and time slot"}
      </Text>


      <Divider />

      <Row gutter={[24, 24]}>
        {/* LEFT SECTION */}
        <Col xs={24} md={16}>
          {/* Session Mode */}
          <Card style={{ borderRadius: 16 }}>
            <Text strong>Session Mode</Text>
            <br />
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{
                marginTop: 12,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <Radio.Button value="online">
                <VideoCameraOutlined /> Online
              </Radio.Button>
              <Radio.Button value="offline">
                <EnvironmentOutlined /> Offline
              </Radio.Button>
            </Radio.Group>
          </Card>

          {/* Date + Counsellor */}
          <Card style={{ marginTop: 24, borderRadius: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Text strong>
                  <UserOutlined /> Select Counsellor
                </Text>
                <Select
                  placeholder="Choose counsellor"
                  style={{ width: "100%", marginTop: 12 }}
                  onChange={(value) => setSelectedCounsellor(value)}
                  allowClear
                >
                  {counsellors.map((c) => (
                    <Select.Option key={c.id} value={c.name}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>

              <Col xs={24} md={12}>
                <Text strong>
                  <CalendarOutlined /> Select Date
                </Text>
                <DatePicker
                  style={{ width: "100%", marginTop: 12 }}
                />
              </Col>
            </Row>
          </Card>

          {/* Slots */}
          <Card
            title={
              <Space>
                <ClockCircleOutlined />
                Available Slots
              </Space>
            }
            style={{ marginTop: 24, borderRadius: 16 }}
          >
            <Row gutter={[12, 12]}>
              {filteredSlots.map((slot, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Button
                    block
                    size="large"
                    disabled={!slot.available}
                    type={
                      selectedSlot === slot.time
                        ? "primary"
                        : "default"
                    }
                    onClick={() => setSelectedSlot(slot.time)}
                    style={{
                      borderRadius: 10,
                      height: 48,
                    }}
                  >
                    {slot.time}
                  </Button>
                </Col>
              ))}
            </Row>

            <Divider />

            {/* Slot Filter */}
            <Space size="large" wrap>
              {/* ALL */}
              <Space
                style={{ cursor: "pointer" }}
                onClick={() => setSlotFilter("all")}
              >
                <Button
                  size="small"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    background:
                      slotFilter === "all"
                        ? "#1677ff"
                        : "#f0f0f0",
                    border: "none",
                  }}
                />
                <Text
                  type={
                    slotFilter === "all"
                      ? "primary"
                      : "secondary"
                  }
                >
                  All
                </Text>
              </Space>

              {/* AVAILABLE */}
              <Space
                style={{ cursor: "pointer" }}
                onClick={() => setSlotFilter("available")}
              >
                <Button
                  size="small"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    background:
                      slotFilter === "available"
                        ? "#52c41a"
                        : "#f0f0f0",
                    border: "none",
                  }}
                />
                <Text
                  type={
                    slotFilter === "available"
                      ? "primary"
                      : "secondary"
                  }
                >
                  Available
                </Text>
              </Space>

              {/* BOOKED */}
              <Space
                style={{ cursor: "pointer" }}
                onClick={() => setSlotFilter("booked")}
              >
                <Button
                  size="small"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    background:
                      slotFilter === "booked"
                        ? "#cf1322"
                        : "#f0f0f0",
                    border: "none",
                  }}
                />
                <Text
                  type={
                    slotFilter === "booked"
                      ? "primary"
                      : "secondary"
                  }
                >
                  Booked
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* RIGHT SECTION – SUMMARY */}
        <Col
          xs={24}
          md={8}
          style={{
            position: "sticky",
            top: 24,
            alignSelf: "flex-start",
          }}
        >
          <Card style={{ borderRadius: 16, marginTop: 16 }}>
            <Space direction="vertical" size="large">
              <Space>
                <Avatar size={48} icon={<UserOutlined />} />
                <div>
                  <Text strong>Assigned Counsellor</Text>
                  <br />
                  <Text type="secondary">
                    {selectedCounsellor ||
                      "Based on availability"}
                  </Text>
                </div>
              </Space>

              <Divider />

              <div>
                <Text type="secondary">Mode</Text>
                <br />
                <Tag color="blue">{mode.toUpperCase()}</Tag>
              </div>

              <div>
                <Text type="secondary">Selected Slot</Text>
                <br />
                <Text strong>
                  {selectedSlot || "Not selected"}
                </Text>
              </div>

              <div>
                <Text type="secondary">Duration</Text>
                <br />
                <Text strong>60 Minutes</Text>
              </div>

              <Button
                type="primary"
                block
                disabled={!selectedSlot || !selectedCounsellor}
                onClick={closeModal}
              >
                {rescheduleData ? "Confirm Reschedule" : "Confirm Booking"}
              </Button>

            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookSessionModal;
