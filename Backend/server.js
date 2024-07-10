const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blood_donation',
  password: '',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Example route for inserting data into PostgreSQL
app.post('/api/donors', async (req, res) => {
  const { fname, mname, lname, nationality, prefecture, city, phone_no, email, national_id, height, weight, postal_code, address, emergency_contact_number, allergies, medical_conditions, blood_related_diseases, blood_type, age_confirmation, consent_to_share } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `
      INSERT INTO user_detail (fname, mname, lname, nationality, prefecture, city, phone_no, email, national_id, height, weight, postal_code, address, emergency_contact_number, allergies, medical_conditions, blood_related_diseases, blood_type, age_confirmation, consent_to_share)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    `;
    await client.query(queryText, [fname, mname, lname, nationality, prefecture, city, phone_no, email, national_id, height, weight, postal_code, address, emergency_contact_number, allergies, medical_conditions, blood_related_diseases, blood_type, age_confirmation, consent_to_share]);
    await client.query('COMMIT');
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  } finally {
    client.release();
  }
});

// Basic route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Donation API');
});

// Middleware for handling undefined routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
