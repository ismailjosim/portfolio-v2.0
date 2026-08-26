import { cookies } from 'next/headers';

/**
 * The dashboard session cookie set by `loginAction` and enforced on `/dashboard/*` by
 * src/proxy.ts. API route handlers are not covered by the proxy matcher, so any admin
 * endpoint has to check this itself.
 */
const SESSION_COOKIE = 'dashboard_session';
const SESSION_VALUE = 'authenticated';

export async function isDashboardAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}
