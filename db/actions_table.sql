DROP TYPE IF EXISTS ACTION_TYPE CASCADE;
CREATE TYPE ACTION_TYPE AS ENUM (
  'edit', 'delete', 'change_audience', -- Post actions
  'show', 'accept', 'reject' -- Suggestion actions
);

CREATE TABLE IF NOT EXISTS actions (
  session_id VARCHAR PRIMARY KEY,
  target_id VARCHAR NOT NULL,
  action_type ACTION_TYPE NOT NULL,
  details VARCHAR,
  performed_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);