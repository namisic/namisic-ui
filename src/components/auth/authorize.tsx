import { SimpleIdServerProvider } from '@/constants/auth';
import { ApiConfigContext } from '@/contexts/api-config-context';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

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
  const { config, configRequested } = useContext(ApiConfigContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (sesion.status === 'unauthenticated') {
      signIn(SimpleIdServerProvider);
    }

    setIsAuthenticated(sesion.status === 'authenticated');
  }, [sesion]);

  useEffect(() => {
    if (isAuthenticated && configRequested) {
      let isAuthorized = true;

      if (allowedRoles !== undefined) {
        let hasRole = false;
        const sessionRoles = sesion.data?.user.role;

        if (sessionRoles !== undefined) {
          if (typeof allowedRoles === 'string') {
            hasRole = sessionRoles.includes(config!.RoleNames![allowedRoles]);
          } else if (Array.isArray(sessionRoles)) {
            hasRole =
              allowedRoles.find((roleName) =>
                sessionRoles.includes(config!.RoleNames![roleName])
              ) !== undefined;
          }
        }

        if (!hasRole && redirectWhenUnauthorized) {
          router.replace('/unauthorized');
        }

        isAuthorized = hasRole;
      }

      setIsAuthorized(isAuthorized);
    }
  }, [isAuthenticated, allowedRoles, configRequested]);

  useEffect(() => {
    if (isAuthorized && onAuthorized !== undefined) {
      onAuthorized();
    }
  }, [isAuthorized]);

  if (!isAuthenticated && !isAuthorized) return null;

  return <>{children}</>;
};

export default Authorize;
