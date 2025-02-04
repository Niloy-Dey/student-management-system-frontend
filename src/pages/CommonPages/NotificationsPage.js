import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchedNotifications = [
      { id: 1, text: 'Team meeting scheduled for tomorrow at 5 PM.', isRead: false },
      { id: 2, text: 'Your weekly progress report is due.', isRead: true },
      { id: 3, text: 'New leaderboard updates available.', isRead: false },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <Container className="my-4">
      <h1 className="text-center">Notifications</h1>
      <Card>
        <Card.Body>
          {notifications.length === 0 ? (
            <p className="text-center">No notifications available.</p>
          ) : (
            <ListGroup>
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={notification.isRead ? 'text-muted' : ''}
                >
                  <span>{notification.text}</span>
                  {!notification.isRead && (
                    <button
                      className="btn btn-link float-end p-0"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationsPage;
