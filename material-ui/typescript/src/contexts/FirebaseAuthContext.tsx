import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import firebase from '../lib/firebase';
import type { User } from '../types/user';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  platform: 'Firebase';
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  refreshUserDataComplete: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state: State, action: Action): State => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Firebase',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  refreshUserDataComplete: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // Post Login steps
      // Here you should extract the complete user profile to make it available in your entire app.
      // The auth state only provides basic information.
      const idToken = await user.getIdToken();
      let setupComplete = false;
      let name = 'N/A';
      let fName = 'N/A';
      let lName = 'N/A';
      let plan = 'N/A';
      await axios.post('http://localhost:4000/login', { id_token: idToken })
        .then((loginResponse) => {
          console.log(loginResponse);
        }).catch((err) => {
          console.log(err);
          if (err.response.data.data === 'unverified_email') {
            user.sendEmailVerification();
            // logout();
          }
        });
      await axios.post('http://localhost:8000/getMyUserData').then((response) => {
        if (response.status === 200) {
          const userObj = response.data;
          setupComplete = true;
          fName = userObj.fName;
          lName = userObj.lName;
          name = `${fName} ${lName}`;
          plan = 'N/A';
        }
      });
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user: {
            id: user.uid,
            avatar: user.photoURL,
            email: user.email,
            emailVerified: user.emailVerified,
            setupComplete,
            name,
            fName,
            lName,
            plan
          }
        }
      });
    } else {
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }), [dispatch]);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<any> => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = (): Promise<any> => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<any> => {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const refreshUserDataComplete = async (): Promise<any> => {
    const auth = useAuth();
    const { user } = auth;
    axios.post('http://localhost:8000/getMyUserData').then((result) => {
      if (result.status === 200) {
        const userClone = { ...user, setupComplete: true };
        console.log(userClone);
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user: userClone
          }
        });
        auth.logout();
      }
    });
    auth.logout();
  };

  const logout = async (): Promise<void> => {
    axios.post('http://localhost:4000/logout');
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Firebase',
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        refreshUserDataComplete,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
