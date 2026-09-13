import pg from 'pg';

const { Pool } = pg;

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured');
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }

  return pool;
}

function sendJson(response, status, body) {
  response.status(status).json(body);
}

function normalizeRegistration(body = {}) {
  return {
    fullName: String(body.fullName || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    rollNo: String(body.rollNo || '').trim() || null,
    phone: String(body.phone || '').trim(),
    cohort: String(body.cohort || '').trim()
  };
}

function validateRegistration(registration) {
  if (registration.fullName.length < 2 || registration.fullName.length > 120) {
    return 'Enter a valid full name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    return 'Enter a valid email address.';
  }

  if (registration.phone.replace(/\D/g, '').length < 10) {
    return 'Enter a valid phone number.';
  }

  const allowedCohorts = [
    'TAPMI MBA Student',
    'External Delegate / Student',
    'Faculty & Alumni',
    'VIP Pass'
  ];

  if (!allowedCohorts.includes(registration.cohort)) {
    return 'Select a valid ticket pass.';
  }

  return null;
}

export default async function handler(request, response) {
  if (!['GET', 'POST'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST');
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  try {
    const database = getPool();

    if (request.method === 'GET') {
      const result = await database.query('SELECT COUNT(*)::int AS count FROM registrations');
      return sendJson(response, 200, { count: result.rows[0].count, capacity: 250 });
    }

    const registration = normalizeRegistration(request.body);
    const validationError = validateRegistration(registration);
    if (validationError) {
      return sendJson(response, 400, { code: 'INVALID_INPUT', error: validationError });
    }

    const client = await database.connect();
    try {
      await client.query('BEGIN');
      const settings = await client.query(
        'SELECT capacity FROM event_settings WHERE id = 1 FOR UPDATE'
      );
      const capacity = settings.rows[0]?.capacity || 250;
      const countResult = await client.query('SELECT COUNT(*)::int AS count FROM registrations');
      const count = countResult.rows[0].count;

      if (count >= capacity) {
        await client.query('ROLLBACK');
        return sendJson(response, 409, {
          code: 'CAPACITY_REACHED',
          error: 'Registration is full. All 250 delegate seats have been allocated.'
        });
      }

      const result = await client.query(
        `INSERT INTO registrations (full_name, email, roll_no, phone, cohort)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, ticket_code, full_name, email, roll_no, phone, cohort, registered_at`,
        [registration.fullName, registration.email, registration.rollNo, registration.phone, registration.cohort]
      );

      await client.query('COMMIT');
      const row = result.rows[0];
      return sendJson(response, 201, {
        count: count + 1,
        registration: {
          id: row.ticket_code,
          fullName: row.full_name,
          email: row.email,
          rollNo: row.roll_no || 'N/A',
          phone: row.phone,
          cohort: row.cohort,
          registeredAt: row.registered_at
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      if (error.code === '23505') {
        return sendJson(response, 409, {
          code: 'DUPLICATE_REGISTRATION',
          error: 'A registration already exists for this email or roll number.'
        });
      }
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return sendJson(response, 500, { code: 'SERVER_ERROR', error: 'Unable to process registration.' });
  }
}
