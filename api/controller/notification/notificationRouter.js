const Notification = require('../../models/notification/notificationSchema');

// Get all notifications for the logged-in user
exports.get_user_notifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).send('Server error');
    }
};

// Mark a notification as read
exports.mark_notification_as_read = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).send('Notification not found');

        // Check if the notification belongs to the logged-in user
        if (notification.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('Not authorized to modify this notification');
        }

        notification.read = true;
        await notification.save();

        return res.status(200).send('Notification marked as read');
    } catch (error) {
        return res.status(500).send('Server error');
    }
};
