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
        size="default"
        items={[
          { title: "Registration" },
          { title: "Package Selection" },
          { title: "Payment" },
          { title: "Exam" },
          { title: "Report" },
          { title: "Counselling" },
          { title: "Full Access" },
        ]}
      />
    </Card>
  );
};

export default Journeysteps;
