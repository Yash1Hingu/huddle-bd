const express = require('express');
const router = express.Router();
const notificationController = require('../../controller/notification/notificationRouter');
const UserAuth = require('../../middleware/userAuth');

// Get user notifications
router.get('/notifications', UserAuth, notificationController.get_user_notifications);

// Mark a notification as read
router.post('/notifications/:notificationId/read', UserAuth, notificationController.mark_notification_as_read);

module.exports = router;
