const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Monstrozitate1!', 
    database: 'bank_system' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Fetch all loans
app.get('/loans', (req, res) => db.query('SELECT * FROM loans', (err, results) => res.json(results)));

app.post('/loans', (req, res) => {
    const { loan_type, amount, interest_rate, start_date } = req.body;

    // Insert query
    const query = 'INSERT INTO loans (loan_type, amount, interest_rate, start_date) VALUES (?, ?, ?, ?)';

    // Execute query
    db.query(query, [loan_type, amount, interest_rate, start_date], (err, results) => {
        if (err) {
            console.error('Error adding client:', err);
            res.status(500).json({ error: 'Failed to add client' });
        } else {
            res.status(201).json({ message: 'Client added successfully', clientId: results.insertId });
        }
    });
});

// Update client details
app.put('/loans/:id', (req, res) => {
    const loanId = req.params.id;
    const { loan_type, amount, interest_rate, start_date } = req.body;

    const query = `
        UPDATE loans 
        SET loan_type = ?, amount = ?, interest_rate = ?, start_date = ? 
        WHERE loan_id = ?`;

    db.query(query, [loan_type, amount, interest_rate, start_date, loanId], (err, results) => {
        if (err) {
            console.error('Error updating client:', err);
            res.status(500).json({ error: 'Failed to update client' });
        } else {
            res.json({ message: 'Client updated successfully' });
        }
    });
});

// Delete client
app.delete('/loans/:id', (req, res) => {
    const clientId = req.params.id;

    const query = 'DELETE FROM loans WHERE loan_id = ?';

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error('Error deleting client:', err);
            res.status(500).json({ error: 'Failed to delete client' });
        } else {
            res.json({ message: 'Client deleted successfully' });
        }
    });
});

// Fetch all clients
app.get('/clients', (req, res) => db.query('SELECT * FROM clients', (err, results) => res.json(results)));

// Add a new client
app.post('/clients', (req, res) => {
    const { first_name, last_name, email, phone_number } = req.body;

    // Insert query
    const query = 'INSERT INTO clients (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)';

    // Execute query
    db.query(query, [first_name, last_name, email, phone_number], (err, results) => {
        if (err) {
            console.error('Error adding client:', err);
            res.status(500).json({ error: 'Failed to add client' });
        } else {
            res.status(201).json({ message: 'Client added successfully', clientId: results.insertId });
        }
    });
});

// Update client details
app.put('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const { first_name, last_name, email, phone_number } = req.body;

    const query = `
        UPDATE clients 
        SET first_name = ?, last_name = ?, email = ?, phone_number = ? 
        WHERE client_id = ?`;

    db.query(query, [first_name, last_name, email, phone_number, clientId], (err, results) => {
        if (err) {
            console.error('Error updating client:', err);
            res.status(500).json({ error: 'Failed to update client' });
        } else {
            res.json({ message: 'Client updated successfully' });
        }
    });
});

// Delete client
app.delete('/clients/:id', (req, res) => {
    const clientId = req.params.id;

    const query = 'DELETE FROM clients WHERE client_id = ?';

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error('Error deleting client:', err);
            res.status(500).json({ error: 'Failed to delete client' });
        } else {
            res.json({ message: 'Client deleted successfully' });
        }
    });
});

// Fetch total number of clients
app.get('/clients_total', (req, res) => db.query('SELECT COUNT(*) FROM clients', (err, results) => res.json(results)));

// Fetch total number of loans
app.get('/loans_total', (req, res) => db.query('SELECT COUNT(*) FROM loans', (err, results) => res.json(results)));

// Fetch all client-loan relationships
app.get('/client_loans', (req, res) => db.query('SELECT * FROM client_loans', (err, results) => res.json(results)));

app.post('/client_loans', (req, res) => {
    const { client_id, loan_id, loan_date } = req.body;

    const query = 'INSERT INTO client_loans (client_id, loan_id, loan_date) VALUES (?, ?, ?)';
    db.query(query, [client_id, loan_id, loan_date], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding client loan');
        } else {
            res.status(201).send('Client loan added successfully');
        }
    });
});

// Update a client loan
app.put('/client_loans/:client_id/:loan_id', (req, res) => {
    const { client_id, loan_id } = req.params;
    const { loan_date } = req.body;

    const query = 'UPDATE client_loans SET loan_date = ? WHERE client_id = ? AND loan_id = ?';
    db.query(query, [loan_date, client_id, loan_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating client loan');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client loan not found');
        } else {
            res.send('Client loan updated successfully');
        }
    });
});

// Delete a client loan
app.delete('/client_loans/:client_id/:loan_id', (req, res) => {
    const { client_id, loan_id } = req.params;

    const query = 'DELETE FROM client_loans WHERE client_id = ? AND loan_id = ?';
    db.query(query, [client_id, loan_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting client loan');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client loan not found');
        } else {
            res.send('Client loan deleted successfully');
        }
    });
});
// Fetch total loan amount
app.get('/total_loan_amount', (req, res) => db.query('SELECT ROUND(SUM(loans.amount), 0) AS total_sum FROM loans', (err, results) => res.json(results)));

// Fetch latest loans
app.get('/latest_loans', (req, res) => db.query('SELECT c.first_name, c.last_name, l.amount, l.start_date FROM loans l JOIN client_loans cl ON l.loan_id = cl.loan_id JOIN clients c ON cl.client_id = c.client_id ORDER BY l.start_date DESC LIMIT 4', (err, results) => res.json(results)));

// Fetch biggest loans
app.get('/biggest_loans', (req, res) => db.query('SELECT c.first_name, c.last_name, l.amount FROM loans l JOIN client_loans cl ON l.loan_id = cl.loan_id JOIN clients c ON cl.client_id = c.client_id ORDER BY l.amount DESC LIMIT 3;', (err, results) => res.json(results)));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});