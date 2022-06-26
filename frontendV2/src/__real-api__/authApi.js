import axios from 'axios';
import { lnRoute } from '../config';
axios.defaults.withCredentials = true;



const lnLogin = async (user) => {
    const id_token = await user.getIdToken()
    const authLink = lnRoute.auth.login
    console.log(authLink)
    const response = await axios.post(authLink, {id_token}).catch((error)=> {console.log(error)});
    console.log(response)
    return response
}

const lnLogout = async () => {
    const res = await axios.post(lnRoute.auth.logout);
    console.log(res)
    return res
}

export { lnLogin, lnLogout}