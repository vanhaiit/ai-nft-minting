import { ArgsProps, NotificationInstance } from "antd/es/notification/interface";

export interface Notification {
  rawApi?: NotificationInstance;
  error: (params: NotificationParams) => void;
  info: (params: NotificationParams) => void;
  warning: (params: NotificationParams) => void;
  success: (params: NotificationParams) => void;
}

export interface NotificationParams extends Omit<ArgsProps, "message"> {
  styleType?: "filled" | "outlined" | "standard";
  message?: string;
}
