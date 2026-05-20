const express = require('express')
const cors = require('cors');
const db = require('./database');

const app = express()

const PORT = 5000;


app.use(cors());
app.use(express.json())


app.post('/api/leads', async (req, res) => {
    const { full_name, phone_number, email, location, property_type, system_size, source } = req.body;

    if (!full_name || !phone_number || !email || !location || !property_type || !system_size || !source) {

        return res.status(400).json({ error: "All fields are required" });

    }

    try {
        const sql = `INSERT INTO leads (full_name, phone_number, email, location, property_type, system_size, source )
      VALUES (?, ?, ?, ?, ?, ?, ?)`
        // Put values straight from the request body into the parameters array
        const params = [
            req.body.full_name,
            req.body.phone_number,
            req.body.email,
            req.body.location,
            req.body.property_type,
            req.body.system_size,
            req.body.source
        ];

        await db.run(sql, params);
        res.status(201).json({ message: " success" });

    } catch (err) {
        res.status(500).json({ error: "Failed" })
    }



})



// lead pipeline managment and filter and search
app.get('/api/leads', async (req, res) => {
    try {
        const { status, location } = req.query;

        let sql = 'SELECT * FROM leads';
        let params = [];


        if (status && location) {
            sql = `SELECT * FROM leads WHERE status = ? AND location LIKE ?`

            params = [status, `%${location}%`]

        } else if (status) {
            sql = 'SELECT * FROM leads WHERE status = ?';
            params = [status];

        }
        else if (location) {
            sql = 'SELECT * FROM leads WHERE location LIKE ?';
            params = [`%${location}%`];
        }

        sql += ` ORDER BY created_at DESC `
        const rows = await db.query(sql, params);
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch leads" })
    }
})


app.patch('/api/leads/:id/status', async (req, res) => {
    try {
        const sql = 'UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        const params = [req.body.status, req.params.id];

        await db.run(sql, params);
        res.json({ message: "Status updated successfully" });
    } catch (err) {
        console.error("Update error:", err.message);
        res.status(500).json({ error: "Failed to update status." });
    }
});





app.get('/api/analytics', async (req, res) => {

    try {

        const totalData = await db.query('SELECT COUNT(*) as count FROM leads');
        const totalLeads = totalData[0].count;

        const wonData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'Won'");
        const wonLeads = wonData[0].count;

        const newLeadData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'New Lead'");
        const contactedData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'Contacted'");
        const siteVisitData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'Site Visit Scheduled'");
        const proposalData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'Proposal Sent'");
        const lostData = await db.query("SELECT COUNT(*) as count FROM leads WHERE status = 'Lost'");

        let conversionRate = "0%";

        if(totalLeads >0){
            conversionRate = ((wonLeads/totalLeads)* 100).toFixed(1) + "%" 
        }
        res.json({
      totalLeads: totalLeads,
      conversionRate: conversionRate,
      newLeads: newLeadData[0].count,
      contacted: contactedData[0].count,
      siteVisits: siteVisitData[0].count,
      proposalsSent: proposalData[0].count,
      wonLeads: wonLeads,
      lostLeads: lostData[0].count
    });



    } catch (err) {
        res.status(500).json({ error: "Failed to load analytics." });

    }
})

app.listen(PORT,()=>{
    console.log(`server is running in the port ${PORT}`)
});
