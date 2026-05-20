const sqlDb = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlDb.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite database:', err.message);
  } else {
    console.log('Connected smoothly to local SQLite database file.');
    createTables();
  }
});

function createTables() {
  db.serialize(() => {
    // Create the leads table with explicit column types and check constraints
    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL,
        location TEXT NOT NULL,
        property_type TEXT NOT NULL CHECK (property_type IN ('Residential', 'Commercial', 'Industrial')),
        system_size REAL NOT NULL CHECK (system_size >= 1 AND system_size <= 100),
        source TEXT NOT NULL CHECK (source IN ('Website', 'Referral', 'Walk-in', 'Social Media')),
        status TEXT NOT NULL DEFAULT 'New Lead' CHECK (status IN ('New Lead', 'Contacted', 'Site Visit Scheduled', 'Proposal Sent', 'Won', 'Lost')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Performance Indexes for frequent searching and status lookups
    db.run(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location)`);
  });
}

// Simple helper utilities to let us use modern async/await syntax in our routes
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) 
        {reject(err);}
      
      else
        {resolve(rows);}
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err)
       {  reject(err);}
      else
        { resolve(this);}
    });
  });
};

module.exports = { query, run };

