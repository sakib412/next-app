import { notification } from "antd";

export default function Notification({ message = "", status }) {
    let type;
    if (status === 'true' || status === 200)
        type = "success"
    else
        type = "error"
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: type.toUpperCase(),
            description: message,
        });
    };

    openNotificationWithIcon(type);
}