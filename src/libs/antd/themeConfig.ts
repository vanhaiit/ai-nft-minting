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
    fontFamily: "SF Pro Display",
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
    fontFamily: "SF Pro Display",
  },
};

export { DarkTheme, LightTheme };
