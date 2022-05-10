
export const queryBuilder = (args) => Object.keys(args).map(key => !!args[key] ? `&${key}=${args[key]}` : "").join("");

import { HEADERS as availableHeaders, BASE_HEADERS } from "../utils/CONSTANTS"

// TODO: refactor metrics to start with that exactly
// TODO: move out stars so its independant, maybe from metrics
export const parseTableHeaders = (requiredKeys = [], entitiesArray = []) => {

    const headers = [...BASE_HEADERS];
    if (requiredKeys) requiredKeys.forEach(key => {
        availableHeaders[key] && headers.push(availableHeaders[key]);
    });

    let metricsObject = {};
    const items = entitiesArray.map(entity => {
        if (requiredKeys) requiredKeys.forEach(metric => (metricsObject[metric] = entity[metric]));
        const { reviewedId, reviewedName, reviewerId, reviewerName, number_of_reviews, reviewedType, score, socialScore } = entity;

        return {
            reviewedId, reviewedName, reviewerId, reviewerName, number_of_reviews, reviewedType, score, socialScore,
            ...metricsObject,
        };
    });

    return { headers, items };
}
