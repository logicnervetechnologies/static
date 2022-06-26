import axios from 'axios';
import { lnRoute } from '../config';
axios.defaults.withCredentials = true;


class DsiApi {
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
