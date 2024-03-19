import type { ThemeConfig } from "antd";

const LightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#dd3b3a",
    colorInfo: "#246cf9",
    colorSuccess: "#06bf71",
    borderRadius: 8,
    colorError: "#dd3b3a",
    colorBgBase: "#fff",
    colorTextBase: "#000",
    fontFamily: "var(--font-roboto-mono)",
  },
  components: {
    Modal: {
      contentBg: "rgb(22, 22, 22)",
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      titleColor: "rgb(255, 255, 255)",
      padding: 24,
      headerBg: "rgb(22, 22, 22)",
      footerBg: "rgb(22, 22, 22)",
      colorText: "rgb(255, 255, 255)",
      fontSize: 20,
      fontSizeHeading5: 20,
      fontSizeLG: 20,
      colorBgMask: "rgba(0, 0, 0, 0.7)",
    },
  },
};

const DarkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#dd3b3a",
    colorInfo: "#246cf9",
    colorSuccess: "#06bf71",
    borderRadius: 8,
    colorError: "#dd3b3a",
    colorBgBase: "#000",
    colorTextBase: "#fff",
    fontFamily: "var(--font-roboto-mono)",
  },
  components: {
    Modal: {
      contentBg: "rgb(22, 22, 22)",
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      titleColor: "rgb(255, 255, 255)",
      padding: 24,
      headerBg: "rgb(22, 22, 22)",
      footerBg: "rgb(22, 22, 22)",
      colorText: "rgb(255, 255, 255)",
      fontSize: 20,
      fontSizeHeading5: 20,
      fontSizeLG: 20,
      colorBgMask: "rgba(0, 0, 0, 0.7)",
    },
  },
};

export { DarkTheme, LightTheme };
