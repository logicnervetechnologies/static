export const amplifyConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID
};

export const auth0Config = {
  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
};

export const gtmConfig = {
  containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID
};


const baseUrl = process.env.NEXT_PUBLIC_BASIS_URL;
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
const udsUrl = process.env.NEXT_PUBLIC_UDS_URL;
const dsiUrl = process.env.NEXT_PUBLIC_DSI_URL;

export const lnRoute = {
  auth: {
    _: authUrl + "/auth",
    login: authUrl + "/auth/login",
    logout: authUrl + "/auth/logout"
  },
  uds: {
    adminAction: udsUrl + "/uds/adminAction",
    createOrganization: udsUrl + "/uds/createOrganization",
    getBasicOrganization: udsUrl + "/uds/getBasicOrganization",
    getOrganization: udsUrl + "/uds/getOrganization",
    getMyUserData: udsUrl + "/uds/getMyUserData",
    userAction: udsUrl + "/uds/userAction"
  }, 
  dsi: {
    testCreateDE: dsiUrl + "/dsi/testCreateDE",
    testRetreiveDE: dsiUrl + "/dsi/testRetrieveDE",
    testIngest: dsiUrl + "/dsi/testIngest",
    createDE: dsiUrl + "/dsi/createDE",
    retreiveDE: dsiUrl + "/dsi/retrieveDE",
    createSchema: dsiUrl + "/dsi/createSchema",
    getSchemasOrg: dsiUrl + "/dsi/getSchemas",
    getSchema: dsiUrl + "/dsi/getSchema",
    create: dsiUrl + "/dsi/create",
    handle: dsiUrl + "/dsi/handle",
    read: dsiUrl + "/dsi/read"
  }
};

