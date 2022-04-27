import Vuex from 'vuex'
import { reviews, metrics } from './modules'

const createStore = () => {
    return new Vuex.Store({
        modules: {
            reviews,
            metrics
        },
    })
}

export default createStore