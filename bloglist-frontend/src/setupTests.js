import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => {
        return savedItems[key]
    },
    removeItem: (key) => {
        savedItems[key] = null
    },
    clear: () => {
        savedItems = {}
    }
}

window.localStorage = localStorageMock
jest.mock('./services/blogs')