import React from 'react';
import { Notifications, Permissions } from 'expo';

class GetNotificationToken extends React.Component {
  constructor(props) {
    super(props)
    this.registerForPushNotificationsAsync()
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
    return token;
  }

  render() {
    return null;
  }
}

export default GetNotificationToken
