import axios from 'axios';
axios.defaults.withCredentials = true;

const submitForm = async (body) => {
    console.log(body)
    const response = await axios.post("https://us-central1-algoimplement.cloudfunctions.net/sendForm", body).catch((error)=> {console.log(error)});
    console.log(response)
    return response
}

export { submitForm }