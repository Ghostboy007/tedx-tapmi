CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SEQUENCE IF NOT EXISTS registration_ticket_seq;

CREATE TABLE IF NOT EXISTS event_settings (
  id integer PRIMARY KEY CHECK (id = 1),
  capacity integer NOT NULL CHECK (capacity > 0)
);

INSERT INTO event_settings (id, capacity)
VALUES (1, 250)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_code text NOT NULL UNIQUE DEFAULT (
    'REG-' || to_char(current_timestamp, 'YYYY') || '-' || lpad(nextval('registration_ticket_seq')::text, 4, '0')
  ),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL,
  roll_no text,
  phone text NOT NULL,
  cohort text NOT NULL CHECK (cohort IN (
    'TAPMI MBA Student',
    'External Delegate / Student',
    'Faculty & Alumni',
    'VIP Pass'
  )),
  registered_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_unique
  ON registrations (lower(email));

CREATE UNIQUE INDEX IF NOT EXISTS registrations_roll_no_unique
  ON registrations (roll_no)
  WHERE roll_no IS NOT NULL AND roll_no <> 'N/A';
