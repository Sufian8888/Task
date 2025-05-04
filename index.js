const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const path = require('path');


// Serve frontend
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/dist', 'index.html'));
});


let users = [];

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const id = Date.now().toString(); // Generate a simple ID
    users.push({ id, name, email });
    res.status(201).json({ message: 'User added successfully' });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.send({ message: 'User deleted successfully' });
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
