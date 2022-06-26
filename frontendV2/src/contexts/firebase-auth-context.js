import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';
import axios from 'axios';
import { lnLogin } from '../__real-api__/authApi';
import { udsApi } from '../__real-api__/udsApi';
axios.defaults.withCredentials = true;

const auth = getAuth(firebaseApp);

var ActionType;
(function (ActionType) {
  ActionType['AUTH_STATE_CHANGED'] = 'AUTH_STATE_CHANGED';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
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

export const AuthContext = createContext({
  ...initialState,
  platform: 'Firebase',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Here you should extract the complete user profile to make it available in your entire app.
      // The auth state only provides basic information.
      console.log(user);
      // await lnLogin(user);
      console.log(process.env.LNURL)
      const authResp = await lnLogin(user);
      // const authResp = await axios.post('http://localhost/auth/login', {id_token: await user.getIdToken()})
      // .catch((error)=> {console.log(error)});
      console.log(authResp)
      const udsResp = await udsApi.getMyUserData();
      console.log(udsResp)
      const newUserData = {
            // id: user.uid,
            // avatar: user.photoURL || undefined,
            // email: user.email || 'anika.visser@devias.io',
            // name: user.name || 'Anika Visser',
            // plan: 'Premium'
      }
      if (udsResp != null) {
        const newUser = udsResp.data;
        newUserData = {
            id: newUser.uid,
            avatar: newUser.avatar,
            email: newUser.email,
            name: newUser.fName + ' ' + newUser.lName,
            plan: 'Premium',
            ...newUser
        }
      }
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isAuthenticated: true,
          user: {
            ...newUserData
          }
        }
      });
      
      console.log(user);
      

    } else {
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }), [dispatch]);

  const _signInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/dashboard';
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  };

  const _createUserWithEmailAndPassword = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await axios.post('http://localhost/auth/logout');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Firebase',
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        signInWithGoogle,
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

export const AuthConsumer = AuthContext.Consumer;
