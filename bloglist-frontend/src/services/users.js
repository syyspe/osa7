import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    try {
        const result = await axios.get(baseUrl)
        return result.data
    } catch(exc) {
        const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
        return {error: msg}
    }
}

const add = async (user) => {
    try {
        const result = await axios.post(baseUrl, user)
        return result.data
    } catch(exc) {
        const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
        return {error: msg}
    }
}

const remove = async (id, token) => {
    try {
        const result = await axios.delete(`${baseUrl}/${id}`, {headers: {Authorization:  `Bearer ${token}`}})
        return result.data || null

    } catch(exc) {
        const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
        return {error: msg}
    }
}

export default { getAll, add, remove }