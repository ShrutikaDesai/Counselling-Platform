import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Tag } from "antd";
import {
  ToolOutlined,
  MedicineBoxOutlined,
  SketchOutlined,
  StockOutlined,
  ReadOutlined,
  BankOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import antdTheme from "../../../theme/antdTheme";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { token } = antdTheme;

/* ================= PROGRAM LIST ================= */
const programs = [
  { title: "Engineering", icon: <ToolOutlined />, color: "#4B7CF3" },
  { title: "Medical", icon: <MedicineBoxOutlined />, color: "#F44336" },
  { title: "Law", icon: <BankOutlined />, color: "#FFC107" },
  { title: "Design", icon: <SketchOutlined />, color: "#9C27B0" },
  { title: "Commerce", icon: <StockOutlined />, color: "#4CAF50" },
  { title: "Arts", icon: <ReadOutlined />, color: "#E91E63" },
];

/* ================= PACKAGES (3 FOR EACH PROGRAM) ================= */
const programPackages = {
  Engineering: [
    {
      title: "Basic Assessment",
      price: "₹499",
      features: [
        "Career Assessment Exam",
        "Basic Career Report",
        "One Counselling Session (30 min)",
        "Free Content Library Access",
      ],
    },
    {
      title: "Standard Guidance",
      price: "₹5,999",
      popular: true,
      features: [
        "Career Assessment Exam",
        "Comprehensive Career Report",
        "Two Counselling Sessions (45 min)",
        "Detailed Career Roadmap",
        "Premium Resources (3 months)",
      ],
    },
    {
      title: "Premium Mentorship",
      price: "₹9,999",
      features: [
        "Advanced Psychometric Analysis",
        "Four Counselling Sessions",
        "Personalized Career Roadmap",
        "Unlimited Follow-ups",
        "College Selection Guidance",
      ],
    },
  ],

  Medical: [
    {
      title: "Basic Medical Assessment",
      price: "₹3,499",
      features: [
        "Medical Aptitude Test",
        "Basic Medical Career Report",
        "One Counselling Session",
        "Free Content Access",
      ],
    },
    {
      title: "Standard Medical Guidance",
      price: "₹6,999",
      popular: true,
      features: [
        "NEET Career Assessment",
        "Detailed Medical Career Report",
        "Two Counselling Sessions",
        "College Admission Roadmap",
      ],
    },
    {
      title: "Premium Medical Mentorship",
      price: "₹11,999",
      features: [
        "Advanced Psychometric Analysis",
        "Four Counselling Sessions",
        "Personalized NEET Strategy",
        "College Selection Guidance",
      ],
    },
  ],

  Law: [
    {
      title: "Basic Law Assessment",
      price: "₹3,999",
      features: [
        "Law Aptitude Test",
        "Basic Law Career Report",
        "One Counselling Session",
        "Free Content Access",
      ],
    },
    {
      title: "Standard Law Guidance",
      price: "₹6,499",
      popular: true,
      features: [
        "CLAT / AILET Guidance",
        "Detailed Career Roadmap",
        "Two Counselling Sessions",
        "College Shortlisting",
      ],
    },
    {
      title: "Premium Law Mentorship",
      price: "₹10,999",
      features: [
        "Advanced Career Analysis",
        "Four Counselling Sessions",
        "Personalized Law Roadmap",
        "Top Law College Guidance",
      ],
    },
  ],

  Design: [
    {
      title: "Basic Design Assessment",
      price: "₹2,999",
      features: [
        "Creative Aptitude Test",
        "Basic Design Career Report",
        "One Counselling Session",
        "Free Content Access",
      ],
    },
    {
      title: "Standard Design Guidance",
      price: "₹5,499",
      popular: true,
      features: [
        "Portfolio Guidance",
        "Detailed Career Roadmap",
        "Two Counselling Sessions",
        "Design College Guidance",
      ],
    },
    {
      title: "Premium Design Mentorship",
      price: "₹9,999",
      features: [
        "Advanced Skill Assessment",
        "Four Counselling Sessions",
        "Personalized Portfolio Plan",
        "Top Design Institute Guidance",
      ],
    },
  ],

  Commerce: [
    {
      title: "Basic Commerce Assessment",
      price: "₹2,799",
      features: [
        "Commerce Aptitude Test",
        "Basic Career Report",
        "One Counselling Session",
        "Free Content Access",
      ],
    },
    {
      title: "Standard Commerce Guidance",
      price: "₹5,299",
      popular: true,
      features: [
        "CA / CS / CMA Guidance",
        "Detailed Career Roadmap",
        "Two Counselling Sessions",
        "Exam Preparation Strategy",
      ],
    },
    {
      title: "Premium Commerce Mentorship",
      price: "₹8,999",
      features: [
        "Advanced Career Analysis",
        "Four Counselling Sessions",
        "Personalized Study Plan",
        "Professional Course Guidance",
      ],
    },
  ],

  Arts: [
    {
      title: "Basic Arts Assessment",
      price: "₹2,499",
      features: [
        "Interest & Skill Assessment",
        "Basic Career Report",
        "One Counselling Session",
        "Free Content Access",
      ],
    },
    {
      title: "Standard Arts Guidance",
      price: "₹4,999",
      popular: true,
      features: [
        "Detailed Career Exploration",
        "Two Counselling Sessions",
        "Arts Career Roadmap",
        "College Selection Support",
      ],
    },
    {
      title: "Premium Arts Mentorship",
      price: "₹7,999",
      features: [
        "Advanced Career Mapping",
        "Four Counselling Sessions",
        "Personalized Career Plan",
        "Creative Industry Guidance",
      ],
    },
  ],
};

/* ================= MAIN COMPONENT ================= */
const Program = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const currentProgram = programs.find((p) => p.title === selectedProgram);
  const programColor = currentProgram?.color || token.colorPrimary;
  const navigate = useNavigate();

  const FreeContentCard = ({ useProgramColor = false }) => (
    <Card
      style={{
        marginTop: 24,
        borderRadius: 16,
        border: `1px solid ${token.colorBgContainer}`,
        background: "linear-gradient(135deg, #F0FFF4 0%, #ECFDF5 100%)",
        boxShadow: token.boxShadow,
      }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            backgroundColor: "#52B788",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ReadOutlined style={{ fontSize: 28, color: "#ffffff" }} />
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <Title level={4} style={{ marginBottom: 6, color: "#52B788" }}>
            Free Content Available
          </Title>

          <Text style={{ color: token.colorTextSecondary, display: "block", maxWidth: 720 }}>
            Browse curated guides, sample tests, videos and case studies that help you explore careers and prepare for exams. No payment required.
          </Text>

          <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Button
              type="default"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate("/student/freecontent")}
            >
              Browse Free Content
            </Button>

          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: token.fontFamily }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Choose Your Career Path
      </Title>

      {/* PROGRAM CARDS */}
      <Row gutter={[16, 16]} justify="center">
        {programs.map((program) => (
          <Col xs={12} sm={8} md={4} key={program.title} style={{ display: "flex" }}>
            <Card
              hoverable
              onClick={() => setSelectedProgram(program.title)}
              style={{
                width: "100%",
                height: 130,
                borderRadius: 8,
                border:
                  selectedProgram === program.title
                    ? "2px solid #4B7CF3"
                    : "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              bodyStyle={{
                padding: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: program.color,
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {program.icon}
              </div>
              <Text strong>{program.title}</Text>
            </Card>
          </Col>
        ))}
      </Row>


      {!selectedProgram && (
        <div style={{ marginTop: 40 }}>
          <FreeContentCard />
        </div>
      )}

      {/* PACKAGE CARDS */}
      {selectedProgram && (
        <div style={{ marginTop: 60 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
            {selectedProgram} Packages
          </Title>

          <Row gutter={[24, 24]} justify="center">
            {programPackages[selectedProgram].map((pkg) => (
              <Col xs={24} md={8} key={pkg.title}>
                <Card style={{ borderRadius: 12, position: "relative", height: "100%", boxShadow: token.boxShadow }}>
                  {pkg.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: token.colorWarning,
                        color: "#fff",
                        padding: "6px 14px",
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        fontSize: 12,
                      }}
                    >
                      ⭐ Most Popular
                    </div>
                  )}<br></br>

                  <Title level={4}>{pkg.title}</Title>
                  <Title level={2} style={{ color: token.colorPrimary }}>
                    {pkg.price}
                  </Title>
                  <Text type="secondary">one-time</Text>

                  <div style={{ marginTop: 20 }}>
                    {pkg.features.map((feature, i) => (
                      <div key={i} style={{ display: "flex", marginBottom: 10 }}>
                        <CheckCircleOutlined
                          style={{ color: token.colorSuccess, marginRight: 8 }}
                        />
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>

                  <Button type="primary" block style={{ marginTop: 20 }}>
                    Select Package
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: 40 }}>
            <FreeContentCard useProgramColor={true} />
          </div>

        </div>
      )}
    </div>
  );
};

export default Program;
