import { HEADERS as availableHeaders, BASE_HEADERS } from "../utils/CONSTANTS"

// TODO: refactor metrics to start with that exactly
// TODO: move out stars so its independant, maybe from metrics
export const parseTableData = (requiredKeys = [], entitiesArray = []) => {
    const headers = [...BASE_HEADERS];
    requiredKeys.forEach(key => {
        availableHeaders[key] && headers.push(availableHeaders[key]);
    });

    const items = entitiesArray.map(entity => {
        if (requiredKeys.length > 0) {
            requiredKeys.forEach(metric => rest[metric.name] && (metricsObject[metric.name] = entity[`${metric.name}`]));

        }
        // let metricsObject = {};
        // const { stars, rest = [] } = getAverageStars(entity);
        // restObj = rest;
        // entityMetrics.forEach(metric => rest[metric.name] && (metricsObject[metric.name] = entity[`${metric.name}`]));
        // return {
        //     name: entity.reviewedName,
        //     reviews: entity.number_of_reviews,
        //     score: entity.score,
        //     ...(entity.providerType && { roles: entity.providerType }),
        //     ...metricsObject,
        //     stars
        // };
    }
    );

    // const headers = [
    //     { text: `${entityType} Name`, align: "start", sortable: false, value: "name" },
    //     { text: "# of Reviews", align: "center", sortable: false, value: "reviews" },
    // ];
    // if (entityType === "providers") {
    //     headers.push({ text: "Roles", align: "center", sortable: false, value: "roles" })
    // }
    // headers.push({ text: `Score (%)`, align: "center", sortable: true, value: "score" })
    // headers.push({ text: "Average Stars", align: "center", sortable: false, value: "stars" })
    // headers.push(...entityMetrics.filter(metric => restObj[metric.name] || restObj[metric.name] === null)?.map(metric => metric.name && ({ text: metric.text, align: metric.align, sortable: metric.sortable, value: metric.value })));
    return { headers, items };
}
