'use client';

import { useActionState } from 'react';
import { AlertCircle } from 'lucide-react';
import { adminLogin, type LoginState } from '@/app/admin/actions';

const initialState: LoginState = { status: 'idle', message: '' };

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form action={formAction} className="login-form">
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoFocus />
      </div>
      <button className="form-submit" type="submit" disabled={pending}>
        {pending ? 'Checking…' : 'Sign in'}
      </button>
      {state.status === 'error' && (
        <div className="form-status error">
          <AlertCircle size={16} />
          {state.message}
        </div>
      )}
    </form>
  );
}
