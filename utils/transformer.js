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
        const { reviewedName, number_of_reviews, reviewedType, score, socialScore } = entity;

        return {
            reviewedName, reviewedType, number_of_reviews, score, socialScore,
            ...metricsObject,
        };
    }); 
    
    return { headers, items };
}
