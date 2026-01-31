import React from "react";
import { Card, Steps, Typography } from "antd";

const { Title } = Typography;

const Journeysteps = ({ currentStep = 1 }) => {
  return (
    <Card
      style={{
        borderRadius: 20,
        padding: "24px 32px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
      }}
    >
      <Title level={4} style={{ marginBottom: 32 }}>
        Your Journey Progress
      </Title>

<Steps
  current={currentStep}
  labelPlacement="vertical"
  items={[
    { title: <span style={{ color: "#0F172A" }}>Registration</span> },
    { title: <span style={{ color: "#0F172A" }}>Package Selection</span> },
    { title: <span style={{ color: "#0F172A" }}>Payment</span> },
    { title: <span style={{ color: "#0F172A" }}>Exam</span> },
    { title: <span style={{ color: "#0F172A" }}>Report</span> },
    { title: <span style={{ color: "#0F172A" }}>Counselling</span> },
    { title: <span style={{ color: "#0F172A" }}>Full Access</span> },
  ]}
/>
    </Card>
  );
};

export default Journeysteps;
