import axios from 'axios';
import { lnRoute } from '../config';
axios.defaults.withCredentials = true;


class DsiApi {

    createTestDE = async(schemaId) => {
        console.log(schemaId)
        let success = true
        const dsiResp = await axios.post(lnRoute.dsi.testCreateDE, {schemaId}).catch((error) => {
            console.log(error)
            success = false
        });
        console.log(dsiResp)
        return success
    }
    retrieveTestDE = async(dsid) => {
        console.log(dsid)
        let success = true
        const dsiResp = await axios.post(lnRoute.dsi.testRetreiveDE, {dsid}).catch((error) => {
            console.log(error)
            success = false
        });
        console.log(dsiResp)
        return dsiResp
    }

    createSchema = async(orgId, name, parameters ) => {
        let success = true
        console.log(orgId)
        const dsiResp = await axios.post(lnRoute.dsi.createSchema, {orgId, type: name, parameters}).catch((error) => {
            console.log(error)
            success = false
        });
        console.log(dsiResp);
        return success
    }
    getSchema = async (schemaId) => {
        let success = true
        const dsiResp = await axios.post(lnRoute.dsi.getSchema, {schemaId}).catch((error) => {
            console.log(error)
        });
        console.log("REsp:")
        console.log(dsiResp)
        if (typeof(dsiResp) == 'object' && 'data' in dsiResp) return dsiResp.data
        else return []
    }

    getSchemasOrg = async(orgId) => {
        const dsiResp = await axios.post(lnRoute.dsi.getSchemasOrg, {orgId}).catch((error) => {
            console.log(error)
        });
        console.log("REsp:")
        console.log(dsiResp)
        if (typeof(dsiResp) == 'object' && 'data' in dsiResp) return dsiResp.data
        else return []
    }

    create = async(type) => {
        const dsiResp = await axios.post(lnRoute.dsi.create, {type}).catch((error) => {console.log(error)});
        console.log(dsiResp)
        return dsiResp
    }
    handle = async(type, dsid, data) => {
        const dsiResp = await axios.post(lnRoute.dsi.handle, {type, dsid, data}).catch((error) => {console.log(error)});
        console.log(dsiResp)
        return dsiResp
    }
    read = async(type, dsid) => {
        const dsiResp = await axios.post(lnRoute.dsi.read, {type, dsid}).catch((error) => {console.log(error)});
        console.log(dsiResp)
        return dsiResp
    }
}

export const dsiApi = new DsiApi();
