import { useContext } from "react";
import { NotificationContext } from "./NotificationProvider";

export const useAppNotification = () => useContext(NotificationContext);
