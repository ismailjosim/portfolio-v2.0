'use client';

import { Button } from '@/src/components/ui/button';
import { LogOut } from 'lucide-react';
import { logoutAction } from '../../services/login-action';

const Logout = () => {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="destructive" className="flex items-center gap-2 w-full">
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </form>
  );
};

export default Logout;
