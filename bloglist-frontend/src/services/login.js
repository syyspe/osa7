import axios from 'axios'
const loginUrl = '/api/login'

const login = async (credentials) => {
    try {
        const result = await axios.post(loginUrl, credentials)
        return result.data || null
    } catch(exc) {
        const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
        return {error: msg}
    }
}

export default {login}