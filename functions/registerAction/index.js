const { Client } = require('pg');

const register_query = "INSERT INTO actions(session_id, target_id, action_type, details) VALUES($1, $2, $3, $4);";

exports.registerAction = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // Connects via environment variables:
    // PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT
    const client = new Client();
    await client.connect();

    const session_id = req.query.session_id || req.body.session_id;
    const target_id = req.query.target_id || req.body.target_id;
    const action_type = req.query.action_type || req.body.action_type;
    const details = req.query.details || req.body.details || "";
    if ((!session_id || session_id == "null")
      || (!target_id || target_id == "null")
      || (!action_type || action_type == "null")) {
      res.sendStatus(400);
      await client.end()
      return;
    }

    client.query(register_query, [session_id, target_id, action_type, details], async (err) => {
      if (err) {
        console.log(err.stack)
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
      await client.end()
    });
  }
};
