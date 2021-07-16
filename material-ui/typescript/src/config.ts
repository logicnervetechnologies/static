export const amplifyConfig = {
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID
};

export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const firebaseConfig = {
  apiKey: 'AIzaSyCrSR0aquvWFH-dXyG_7tv_S8QkCW1dWT4',
  authDomain: 'algoimplement.firebaseapp.com',
  databaseURL: 'https://algoimplement.firebaseio.com',
  projectId: 'algoimplement',
  storageBucket: 'algoimplement.appspot.com',
  messagingSenderId: '864207905789',
  appId: '1:864207905789:web:b2f3a328831587d8472f94',
  measurementId: 'G-HRYB5XB9YH'
};

export const gtmConfig = {
  containerId: process.env.REACT_APP_GTM_CONTAINER_ID
};
