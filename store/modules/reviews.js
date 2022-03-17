export const reviews = {
    namespace: true,
    state: {
        allReviews: [],
        allReviewsLength: 0,
        groupedWorstReviews: { facilities: [], providers: [], services: [], suppliers: [], consumers: [] },
        groupedReviews: { facilities: [], providers: [], services: [], suppliers: [], consumers: [] },
        worstReviews: [],
        selectedReview: {},
        daysBefore: 999999
    },

    mutations: {
        setAllReviews: (state, payload) => state.allReviews = payload,
        setAllReviewsCount: (state, payload) => state.allReviewsLength = payload,
        setGroupedWorstReviews: (state, payload) => state.groupedWorstReviews = payload,
        setGroupedReviews: (state, payload) => state.groupedReviews = payload,
        setWorstReviews: (state, payload) => state.worstReviews = payload,
        setSelectedReview: (state, payload) => state.selectedReview = payload,
        setDaysBefore: (state, payload) => state.daysBefore = payload,
    },

    actions: {
        async getAllReviews({ commit, state }, payload = { limit: 0, offset: 0 }) {
            const data = await this.$axios.$get(`/reviews?limit=${payload.limit}&offset=${payload.offset}&daysBefore=${state.daysBefore}`);
            if (!data.count) return commit('setAllReviews', data);
            commit('setAllReviews', data.rows);
            return commit('setAllReviewsCount', data.count);
        },
        async getGroupedWorstReviews({ commit, state }) {
            const entities = ["facilities", "providers", "services", "suppliers", "consumers"];
            const [facilities, providers, services, suppliers, consumers] =
                await Promise.all(entities.map(entity => this.$axios.$get(`/reviews/average/${entity}?limit=5&daysBefore=${state.daysBefore}`)));
            commit('setGroupedWorstReviews', { facilities, providers, services, suppliers, consumers });
        },
        async getGroupedReviews({ commit, state }) {
            const entities = ["facilities", "providers", "services", "suppliers", "consumers"];
            const [facilities, providers, services, suppliers, consumers] =
                await Promise.all(entities.map(entity => this.$axios.$get(`/reviews/average/${entity}?daysBefore=${state.daysBefore}`)));
            commit('setGroupedReviews', { facilities, providers, services, suppliers, consumers });
        },
        async getWorstReviews({ commit, state }, payload) {
            const data = await this.$axios.$get(`/reviews?limit=5&daysBefore=${state.daysBefore}`);
            if (!data.count) return commit('setWorstReviews', data);
            commit('setWorstReviews', data.rows);
        },
        setSelectedReview({ commit }, payload) {
            commit('setSelectedReview', payload);
        },
        setDaysBefore({ commit }, payload) {
            commit('setDaysBefore', payload);
        }
    },

    getters: {
        getAllReviews(state) {
            return state.allReviews
        },
        getAllReviewsLength(state) {
            return state.allReviewsLength
        },
        getGroupedWorstReviews(state) {
            return state.groupedWorstReviews
        },
        getGroupedReviews(state) {
            return state.groupedReviews
        },
        getWorstReviews(state) {
            return state.worstReviews
        },
        getSelectedReview(state) {
            return state.selectedReview
        },
        getDaysBefore(state) {
            return state.daysBefore
        }
    },
};