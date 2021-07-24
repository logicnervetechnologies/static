import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import Login from '../pages/authentication/Login';
import VerifyEmail from '../pages/VerifyEmail';
import FinishCreatingUser from '../pages/FinishCreatingUser';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Login />;
  }
  console.log('User info');
  console.log(auth.user);
  if (!auth.user.emailVerified) {
    return <VerifyEmail />;
  }
  if (!auth.user.setupComplete) {
    auth.refreshUserDataComplete();
    console.log('user setup incomplete');
    console.log(auth.user);
    return <FinishCreatingUser />;
  }
  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
