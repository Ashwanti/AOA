import type { Metadata } from 'next';
import type { RowDataPacket } from 'mysql2';
import { LogOut } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/auth';
import { getPool } from '@/lib/db';
import { adminLogout } from './actions';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

interface InquiryRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  created_at: string;
}

async function getInquiries() {
  try {
    const pool = getPool();
    const [rows] = await pool.query<InquiryRow[]>(
      'SELECT id, name, email, project_type, budget, message, created_at FROM inquiries ORDER BY created_at DESC LIMIT 200'
    );
    return { rows, error: null as string | null };
  } catch (error) {
    console.error('Failed to load inquiries', error);
    return {
      rows: [] as InquiryRow[],
      error: 'Could not reach the database. Check MYSQL_HOST/USER/PASSWORD/DATABASE in your environment.',
    };
  }
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <main className="login-shell">
        <div className="login-card">
          <p className="eyebrow">AOA admin</p>
          <h1>Project inquiries</h1>
          <p>Sign in to view messages submitted through the site&apos;s contact form.</p>
          <AdminLoginForm />
        </div>
      </main>
    );
  }

  const { rows, error } = await getInquiries();

  return (
    <main className="admin-shell">
      <div className="admin-header">
        <div>
          <p className="eyebrow">AOA admin</p>
          <h1>Project inquiries</h1>
        </div>
        <form action={adminLogout}>
          <button className="btn-ghost" type="submit">
            Sign out <LogOut size={14} />
          </button>
        </form>
      </div>

      {error && <div className="form-status error">{error}</div>}

      {!error && rows.length === 0 && (
        <p className="admin-empty">
          No inquiries yet — new submissions from the contact form will show up here automatically.
        </p>
      )}

      {!error && rows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Budget</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td>{row.name}</td>
                  <td>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  </td>
                  <td>{row.project_type}</td>
                  <td>{row.budget}</td>
                  <td className="admin-message-cell">{row.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
