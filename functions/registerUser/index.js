const { Client } = require('pg');

const check_registered_query = "SELECT * FROM user_sessions WHERE qualtrics_session_id = $1;";
const register_query = "INSERT INTO user_sessions(qualtrics_session_id, tone) VALUES($1, $2);";

exports.registerUser = async (req, res) => {
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
    const condition = req.query.condition || req.body.condition;
    if ((!session_id || session_id == "null") || (!condition || condition == "null")) {
      res.sendStatus(400);
      await client.end()
      return;
    }

    // Check if this qualtrics ID is already registered
    client.query(check_registered_query, [session_id], async (err, db_res) => {
      if (err) {
        console.log(err.stack)
        res.sendStatus(500);
      } else {
        const n_rows = (db_res.rows && db_res.rows.length) || 0;
        if (n_rows == 0) {
          // If not registered, register it
          client.query(register_query, [session_id, condition], async (err, db_res) => {
            if (err) {
              console.log(err.stack)
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
            await client.end()
          });
        } else {
          res.sendStatus(200);
          await client.end()
        }
      }
    })
  }
};
