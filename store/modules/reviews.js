import { queryBuilder } from "../../utils";

export const reviews = {
    namespace: true,
    state: {
        overviewReviews: {
            facilities: [],
            providers: [],
            services: [],
            suppliers: [],
            consumers: [],
            reviews: []
        },
        allReviews: {
            facilities: { rows: [], count: 0 },
            providers: { rows: [], count: 0 },
            services: { rows: [], count: 0 },
            suppliers: { rows: [], count: 0 },
            consumers: { rows: [], count: 0 },
            reviews: { rows: [], count: 0 }
        },
        entityReviews: {
            openDialog: false,
            type: "",
            id: "",
            average: {},
            all: { rows: [], count: 0 }
        },
        daysBefore: 999999
    },

    mutations: {
        setOverviewReviews: (state, payload) => state.overviewReviews = payload,
        setAllReviews: (state, payload) => state.allReviews = { ...state.allReviews, ...payload },
        setEntityReviews: (state, payload) => state.entityReviews = { ...state.entityReviews, ...payload },
        setEntityInfo: (state, payload) => state.entityReviews = { ...state.entityReviews, ...payload },
        toggleEntityDialog: (state) => state.entityReviews.openDialog = !state.entityReviews.openDialog,
        setDaysBefore: (state, payload) => state.daysBefore = payload,
    },

    actions: {
        // TODO: FIX THIS INTO QUERY BUILDER
        async getOverviewReviews({ commit, state }, payload = { limit: 5 }) {
            payload.daysBefore = state.daysBefore;

            const promiseArray = ["facilities", "providers", "services", "suppliers", "consumers"]
                .map(entity => this.$axios.$get(`/backend/reviews/average/${entity}?limit=5&daysBefore=${state.daysBefore}`));
            promiseArray.push(this.$axios.$get(`/backend/reviews?limit=5&daysBefore=${state.daysBefore}`));

            const response = await Promise.all(promiseArray);
            return commit('setOverviewReviews',
                {
                    facilities: response[0].rows,
                    providers: response[1].rows,
                    services: response[2].rows,
                    suppliers: response[3].rows,
                    consumers: response[4].rows,
                    reviews: response[5].rows
                });
        },
        async getAllReviews({ commit, state }, payload = { limit: 10, offset: null, orderBy: null, orderDesc: null }) {
            payload.daysBefore = state.daysBefore;
            const promiseArray = ["facilities", "providers", "services", "suppliers", "consumers"]
                .map(entity => this.$axios.$get(`/backend/reviews/average/${entity}?${queryBuilder(payload)}`));
            promiseArray.push(this.$axios.$get(`/backend/reviews?${queryBuilder(payload)}`));

            const response = await Promise.all(promiseArray);
            return commit('setAllReviews',
                {
                    facilities: { rows: response[0].rows, count: response[0].count.length },
                    providers: { rows: response[1].rows, count: response[1].count.length },
                    services: { rows: response[2].rows, count: response[2].count.length },
                    suppliers: { rows: response[3].rows, count: response[3].count.length },
                    consumers: { rows: response[4].rows, count: response[4].count.length },
                    reviews: { rows: response[5].rows, count: response[5].count }
                });
        },
        async sortReviews({ commit, state }, payload = { type: "reviews", limit: 10, offset: null, orderBy: null, orderDesc: null }) {
            payload.daysBefore = state.daysBefore;
            let response;

            if (payload.type !== "reviews") response = await this.$axios.$get(`/backend/reviews/average/${payload.type}?${queryBuilder(payload)}`)
            if (payload.type === "reviews") response = await this.$axios.$get(`/backend/reviews?${queryBuilder(payload)}`);
            return commit('setAllReviews', { [payload.type]: { rows: response.rows, count: response.count.length || response.count } });
        },
        async getEntityReviews({ commit, state }, payload = {}) {
            payload.daysBefore = state.daysBefore;
            payload.id = state.entityReviews.id;
            console.log({ payload });
            const [{ rows: average }, all] = await Promise.all([
                this.$axios.$get(`/backend/reviews/average/${state.entityReviews.type}?${queryBuilder(payload)}`),
                this.$axios.$get(`/backend/reviews/${state.entityReviews.type}?${queryBuilder(payload)}`)
            ]);

            commit('setEntityReviews', {
                average,
                all
            });
        },
        setDaysBefore({ commit }, payload) {
            commit('setDaysBefore', payload);
        }
    },

    getters: {
        getOverviewReviews: (state) => (type) => {
            return state.overviewReviews[type] || []
        },
        getAllReviews: (state) => (type) => {
            return state.allReviews[type] || []
        },
        getEntityReviews: (state) => {
            return state.entityReviews
        },
        openEntityDialog: (state) => {
            return state.entityReviews.openDialog
        },
        getDaysBefore: (state) => {
            return state.daysBefore
        }
    },
};