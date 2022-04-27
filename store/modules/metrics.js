import { queryBuilder } from "../../utils";

export const metrics = {
    namespace: true,
    state: {
        metrics: {},
        requiredMetrics: {}
    },

    mutations: {
        setMetrics: (state, payload) => state.metrics = payload,
        setRequiredMetrics: (state, { type, data }) => state.requiredMetrics[type] = data,
    },

    actions: {
        async getMetrics({ commit, state }, payload = { orgId: -1 }) {

            const data = await this.$axios.$get(`/backend/metrics/${payload.orgId}`);
            return commit('setMetrics', data.rows[0]);
        },

        async getRequiredMetrics({ commit, state }, payload = { reviewedType, orgId: -1 }) {
            console.log("building", payload.reviewedType);
            if (!payload.reviewedType) return;
            console.log("built");

            const data = await this.$axios.$get(`/backend/metrics/required/${payload.reviewedType}?${queryBuilder(payload)}`);
            return commit('setRequiredMetrics', { type: payload.reviewedType, data: Object.keys(data) });
        }
    },

    getters: {
        getMetrics: (state) => {
            return state.metrics;
        },
        getRequiredMetrics: (state) => (type) => {
            return state.requiredMetrics[type];
        },
    },
};