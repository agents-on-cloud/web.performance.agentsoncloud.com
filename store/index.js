import Vuex from 'vuex'
import { reviews } from './modules'

const createStore = () => {
    return new Vuex.Store({
        modules: {
            reviews
        },
    })
}

export default createStore