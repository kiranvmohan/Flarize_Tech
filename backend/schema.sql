SQL


1. DATABASE TABLE SCHEMA CONFIGURATION


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


      2. 6 SEED SAMPLE DATA RECORDS

      INSERT INTO leads (full_name, phone_number, email, location, property_type, system_size, source, status) 
VALUES 
('priya Menon', '8765432109', ' priya@example.com', 'Thrissur', 'commercial', 20.0, 'Referrel', 'Site Visit Scheduled
'),

('Rajesh Kumar', '9876543210', 'rajesh@example.com', 'kochi', 'Residential', 5, 'website', 'New Lead'),

('Ashin Shaju', '9895098765', 'ashinshaju@example.com', 'Thrissur', 'Commercial', 10.0, 'Walk-in', 'Proposal sent'),

('Arya kumar', '9744234567', 'batman@example.com', 'Kozhikode', 'Industrial', 30.0, 'Social Media', 'New lead'),

('Arjun Mehta', '9562789012', 'arjun.mehta@example.com', 'Palakkad', 'Commercial', 25.0, 'Website', 'Site Visit Scheduled'),
