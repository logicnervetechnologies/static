// import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import type { User } from '../types/user';
import axios from 'axios';
import { userDataService } from '../contexts/LNurl';
// import useAuth from '../hooks/useAuth';

axios.defaults.withCredentials = true;

// const now = new Date();

class UserApi {
  setUserAccountInformation = async (userInfo) : Promise<boolean> => {
    const request = axios.post(userDataService('updateAccountInfo'), { userInfo });
    return request
      .then((result) => Promise.resolve(result.data))
      .catch((err) => Promise.reject(err));
  };
}

export const organizationApi = new UserApi();
