// src/theme/adminTheme.js

import { color } from "framer-motion";

const adminTheme = {
  token: {
 
    colorPrimary: "#1E40AF",     
    colorInfo: "#6b85db",
    colorSuccess: "#22C55E",
    colorWarning: "#F59E0B",
    colorError: "#EF4444",

    colorBgLayout: "#F8FAFC",    
    colorBgContainer: "#FFFFFF", 
    colorBgElevated: "#FFFFFF",

    colorTextBase: "#0F172A",
    colorTextPrimary:"#FFFFFF", 
    colorTextSecondary: "#64748B",
    colorTextTertiary:"#e9e9e9"  , 


    colorBorder: "#E2E8F0",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",

    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 14,
    borderRadius: 10,
  },

  components: {

    Menu: {
      itemBorderRadius: 10,
      itemSelectedBg: "#EEF2FF",
      itemSelectedColor: "#1E40AF",
      itemHoverBg: "#F1F5F9",
      itemColor: "#E0E7FF",
      darkItemSelectedBg: "#FFFFFF",
      darkItemSelectedColor: "#1E40AF",
    },


    Button: {
      borderRadius: 10,
      controlHeight: 40,
      fontWeight: 500,
    },


    Card: {
      borderRadiusLG: 16,
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
    },

    /* =====================
       TABLE
    ====================== */
    Table: {
      headerBg: "#F8FAFC",
      headerColor: "#0F172A",
      rowHoverBg: "#F1F5F9",
      borderColor: "#E2E8F0",
    },


  },
};

export default adminTheme;
