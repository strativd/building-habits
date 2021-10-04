import { React } from 'react';
import { useRouter } from 'next/router';

import ResetRequest from '../components/ResetRequest';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage() {
  const router = useRouter();
  const { token } = router.query;

  return token ? <ResetPassword token={token} /> : <ResetRequest />;
}
