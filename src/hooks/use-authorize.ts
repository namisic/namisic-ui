import { ApiConfigContext } from '@/contexts/api-config-context';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

function useAuthorize() {
  const session = useSession();
  const { config } = useContext(ApiConfigContext);

  const isAuthorized = (allowedRoles?: null | string | string[]) => {
    if (allowedRoles !== undefined && allowedRoles !== null) {
      let hasRole = false;
      const sessionRoles = session.data?.user.role;

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

      return hasRole;
    }

    return true;
  };

  return {
    isAuthorized,
  };
}

export default useAuthorize;
