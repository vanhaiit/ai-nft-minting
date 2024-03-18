"use client";
import { notification } from "antd";
import clsx from "clsx";
import { createContext, useCallback } from "react";
// import styles from "./Notification.module.scss";
import { Notification, NotificationParams } from "./types";
import { Notification_Duration } from "@/constants";

export const NotificationContext = createContext<Notification>({
  error: (params: NotificationParams) => {},
  info: (params: NotificationParams) => {},
  success: (params: NotificationParams) => {},
  warning: (params: NotificationParams) => {},
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

const { useNotification } = notification;

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [rawApi, contextHolder] = useNotification({ placement: "topRight" });

  const error = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      ...props
    }: NotificationParams) => {
      const classNames = clsx(className, styleType);

      const icon = styleType === "filled" ? null : null;

      rawApi.error({
        className: classNames,
        closeIcon: false,
        icon,
        message: message ?? "error",
        duration: Notification_Duration,
        ...props,
      });
    },
    [rawApi]
  );

  const info = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      ...props
    }: NotificationParams) => {
      const classNames = clsx(className, styleType);

      const icon = styleType === "filled" ? null : null;

      rawApi.info({
        className: classNames,
        closeIcon: false,
        icon,
        message: message ?? "info",
        duration: Notification_Duration,
        ...props,
      });
    },
    [rawApi]
  );

  const warning = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      ...props
    }: NotificationParams) => {
      const classNames = clsx(className, styleType);

      const icon = styleType === "filled" ? null : null;

      rawApi.warning({
        className: classNames,
        closeIcon: false,
        icon,
        message: message ?? "warning",
        duration: Notification_Duration,
        ...props,
      });
    },
    [rawApi]
  );

  const success = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      ...props
    }: NotificationParams) => {
      const classNames = clsx(className, styleType);

      const icon = styleType === "filled" ? null : null;

      rawApi.success({
        className: classNames,
        closeIcon: false,
        icon,
        message: message ?? "success",
        duration: Notification_Duration,
        ...props,
      });
    },
    [rawApi]
  );

  return (
    <NotificationContext.Provider
      value={{
        rawApi,
        error,
        info,
        success,
        warning,
      }}
    >
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};
