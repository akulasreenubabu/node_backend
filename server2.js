const express = require('express');
const dbConnection = require('./databaseConnection');

const app = express();
app.use(express.json());

// Connect to the database when the app starts
dbConnection.connect(); 

// GET user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const client = dbConnection.connect2();  // Get the single connection
        const id = req.params.id;

        // Use parameterized query to prevent SQL injection
        const [rows] = await client.promise().query('SELECT * FROM users WHERE id = ?', [id]);

        console.log('Users:', rows);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User data successfully fetched', data: rows[0] });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Something went wrong! Contact Administrator' });
    }
});

// POST new users
app.post('/user', async (req, res) => {
    try {
        const body = req.body;
        console.log('Request body:', JSON.stringify(body));

        const client = dbConnection.connect2();  // Get the single connection
        const query = "INSERT INTO users (id, name, course) VALUES ?";
        const values = body.map(item => [item.id, item.name, item.course]);
        
        const [result] = await client.promise().query(query, [values]);
        console.log('Insert result:', result);

        res.json({ message: "Users added successfully", data: body });
    } catch (error) {
        console.error('Error adding users:', error);
        res.status(500).json({ message: "Something went wrong! Contact Administrator" });
    }
});

// PUT (Update user)
app.put('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;

        const client = dbConnection.connect2();  // Get the single connection
        const query = "UPDATE users SET name = ?, course = ? WHERE id = ?";
        const values = [updatedData.name, updatedData.course, id];

        const [result] = await client.promise().query(query, values);
        console.log('Update result:', result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User successfully updated" });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: "Something went wrong! Contact Administrator" });
    }
});

// DELETE user by ID
app.delete('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const client = dbConnection.connect2();  // Get the single connection
        const query = "DELETE FROM users WHERE id = ?";
        const [result] = await client.promise().query(query, [id]);

        console.log('Delete result:', result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User successfully deleted" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Something went wrong! Contact Administrator" });
    }
});

// Server setup
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
