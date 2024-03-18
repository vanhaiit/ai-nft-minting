"use client";
import { ConfigProvider } from "antd";
import React, { useState } from "react";
import { DarkTheme, LightTheme } from "./themeConfig";
import { THEME_MODE } from "@/constants/theme";

const ThemeConfigProvider = ({ children }: React.PropsWithChildren & any) => {
  const [ThemeMode, setThemeMode] = useState<string>(THEME_MODE.LIGHT);
  // const changeTheme = (system?: boolean) => {
  //   var body = document.getElementsByTagName("body")[0];
  //   console.log(1, window.matchMedia("(prefers-color-scheme: dark)").matches);
  //   if (system) {
  //     const theme = ThemeMode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT;
  //     body.setAttribute("data-theme", theme);
  //     return body.removeAttribute("data-theme");
  //   } else {
  //     const theme = ThemeMode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT;
  //     setThemeMode(theme);
  //     body.setAttribute("data-theme", theme);
  //   }
  // };

  return (
    <ConfigProvider
      theme={ThemeMode === THEME_MODE.LIGHT ? LightTheme : DarkTheme}
    >
      {/* <AppButton type="primary" onClick={() => changeTheme()}>
        Change Theme
      </AppButton>
      <AppButton type="primary" onClick={() => changeTheme(true)}>
        use system
      </AppButton> */}
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfigProvider;
