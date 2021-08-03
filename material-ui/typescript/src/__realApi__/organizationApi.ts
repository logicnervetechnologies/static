// import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import type { Organization } from '../types/organization';
import axios from 'axios';
import { userDataService } from '../contexts/LNurl';
// import useAuth from '../hooks/useAuth';

axios.defaults.withCredentials = true;

// const now = new Date();

class OrganizationApi {
  getOrganizations(): Promise<any[]> {
    const organizations: any[] = [
    ];

    return Promise.resolve(organizations);
  }

  getOrganization = async (orgId) : Promise<Organization> => {
    // let organization : Organization = null;
    const request = axios.post(userDataService('getOrganization'), { orgId });
    return request
      .then((result) => Promise.resolve(result.data))
      .catch((err) => Promise.reject(err));
  };

  getMembers = async (orgId) : Promise<any> => {
    const request = axios.post(userDataService('getMembers'), { orgId });
    return request
      .then((result) => Promise.resolve(result.data))
      .catch((err) => Promise.reject(err));
  };
}

export const organizationApi = new OrganizationApi();
