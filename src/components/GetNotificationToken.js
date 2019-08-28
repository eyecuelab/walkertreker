import React from "react";
import { Notifications, Permissions } from "expo";

class GetNotificationToken extends React.Component {
  constructor(props) {
    super(props);
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log("");
    console.log(" ========================= ");
    console.log("");
    console.log("   YOUR NOTIFICATION TOKEN: ", token);
    console.log("");
    console.log(" ========================= ");
    console.log("");
    return token; // eslint-disable-line consistent-return
  };

  render() {
    return null;
  }
}

export default GetNotificationToken;
