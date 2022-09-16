import axios from 'axios';
import { lnRoute } from '../config';
axios.defaults.withCredentials = true;




class UdsApi {
    getMyUserData = async() => {
        const udsResp = await axios.post(lnRoute.uds.getMyUserData).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp
    }
    createOrganization = async(orgName, orgAddress) => {
        const nOrg = {
            orgName,
            orgAddress
        }
        const udsResp = await axios.post(lnRoute.uds.createOrganization, nOrg).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp
    }
    adminAction = async(adminActionObj) => {
        const udsResp = await axios.post(lnRoute.uds.adminAction, adminActionObj).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp
    }
    getBasicOrganization = async(orgIds) => {
        const udsResp = await axios.post(lnRoute.uds.getBasicOrganization, { orgIds }).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp.data.orgs
    }
    getOrganization = async(orgId) => {
        console.log(orgId)
        const udsResp = await axios.post(lnRoute.uds.getOrganization, { orgId }).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp.data
    }
    userAction = async(actionObj) => {
        const udsResp = await axios.post(lnRoute.uds.userAction, actionObj).catch((error) => {console.log(error)});
        console.log(udsResp)
        return udsResp
    }
};

export const udsApi = new UdsApi();
