import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type AuthKeys = 'userDetail';

type RoleType = 'admin' | 'manager' | 'user';
type RoleTypes = RoleType[];

const authMap: Record<AuthKeys, RoleTypes> = {
  userDetail: ['admin', 'manager']
};

export const checkUserAuthorize = (userRole: RoleType, authKey: AuthKeys) => {
  const roles = authMap[authKey];

  const authorized = roles.includes(userRole);

  return authorized;
};

type Props = {
  children: JSX.Element;
  authKey: AuthKeys;
};

export default function RouteGuard(props: Props) {
  const { children, authKey } = props;
  const userRole: RoleType = 'manager';
  const isUserAuthorized = checkUserAuthorize(userRole, authKey);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthorized) {
      navigate('/');
    }
  }, [isUserAuthorized, navigate]);

  return <>{children}</>;
}
