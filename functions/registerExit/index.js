const { Client } = require('pg');

const update_query = "UPDATE user_sessions SET exit_time = CURRENT_TIMESTAMP WHERE qualtrics_session_id = $1;";

exports.registerExit = async (req, res) => {
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
    if (!session_id || session_id == "null") {
      res.sendStatus(400);
      await client.end()
      return;
    }

    // Update the user's session registration with the exit time
    client.query(update_query, [session_id], async (err, db_res) => {
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
