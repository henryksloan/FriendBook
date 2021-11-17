DROP TYPE IF EXISTS TONE CASCADE;
CREATE TYPE TONE AS ENUM ('passive', 'neutral', 'assertive');

CREATE TABLE IF NOT EXISTS user_sessions (
  user_id SERIAL PRIMARY KEY,
  qualtrics_session_id VARCHAR NOT NULL,
  tone TONE NOT NULL
);