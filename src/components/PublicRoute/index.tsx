import React from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import Redirect from 'components/Redirect';

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) return <Redirect to='/' />;

  return <>{children}</>;
}
