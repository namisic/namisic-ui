import { SimpleIdServerProvider } from '@/constants/auth';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AuthorizeProps extends React.PropsWithChildren {
  allowedRoles?: string | string[];
  redirectWhenUnauthorized?: true;
  onAuthorized?: () => void;
}

const Authorize: React.FC<AuthorizeProps> = ({
  allowedRoles,
  children,
  onAuthorized,
  redirectWhenUnauthorized,
}) => {
  const router = useRouter();
  const sesion = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (sesion.status === 'unauthenticated') {
      signIn(SimpleIdServerProvider);
    }

    setIsAuthenticated(sesion.status === 'authenticated');
  }, [sesion]);

  useEffect(() => {
    if (isAuthenticated) {
      let isAuthorized = true;

      if (allowedRoles !== undefined) {
        let hasRole = false;

        if (typeof sesion.data?.user.role === 'string') {
          hasRole = allowedRoles.includes(sesion.data?.user.role);
        } else {
          hasRole =
            sesion.data?.user.role.find((role) =>
              allowedRoles.includes(role)
            ) !== undefined;
        }

        if (!hasRole && redirectWhenUnauthorized) {
          router.replace('/unauthorized');
        }

        isAuthorized = hasRole;
      }

      setIsAuthorized(isAuthorized);
    }
  }, [isAuthenticated, allowedRoles]);

  useEffect(() => {
    if (isAuthorized && onAuthorized !== undefined) {
      onAuthorized();
    }
  }, [isAuthorized]);

  if (!isAuthenticated && !isAuthorized) return null;

  return <>{children}</>;
};

export default Authorize;
