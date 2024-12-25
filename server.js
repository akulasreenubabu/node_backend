const express = require('express');
const app = express();
app.use(express.json());

// Sample in-memory data for users
let users = [
    { id: 1, name: 'Venkat', course: 'Node' },
    { id: 2, name: 'Lavanya', course: 'React' },
    { id: 3, name: 'Teja', course: 'UI/UX' },
    { id: 4, name: 'Shiva', course: 'Node' }
];

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome Back!');
});

// General endpoint for /user
app.get('/user', (req, res) => {
    res.json({
        message: "Successful",
        data: users // Return all users in the response
    });
});

// Get user by ID
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Find user with the specified ID
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        message: 'User data successfully fetched',
        data: user
    });
});

// Add new users
app.post('/user', (req, res) => {
    const body = req.body;

    // Validate incoming data (ensure each user has `id`, `name`, and `course`)
    if (!Array.isArray(body) || !body.every(item => item.id && item.name && item.course)) {
        return res.status(400).json({
            message: "Invalid data. Each user must have 'id', 'name', and 'course'."
        });
    }

    // Add new users to the existing users array
    users = [...users, ...body];

    res.json({
        message: "Users added successfully",
        data: body,
        users
    });
});

// Update a user's data
app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    // Validate that `name` and `course` are provided in the update request
    if (!updatedData.name || !updatedData.course) {
        return res.status(400).json({
            message: "Invalid data. 'name' and 'course' are required fields."
        });
    }

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Update the user
    users[userIndex] = { ...users[userIndex], ...updatedData };

    res.json({
        message: "User successfully updated",
        data: users[userIndex]
    });
});

// Delete a user by ID
app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Find the user to delete
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    res.json({
        message: "User successfully deleted",
        users
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
