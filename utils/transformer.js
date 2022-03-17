import metrics from "../../metrics.json"

export const parseEntitiesTable = (entitiesObject, entityType = "facilities") => {

    const entityMetrics = entityType === "providers" ? metrics[entityType]["front-facing"] : metrics[entityType];
    const items = entitiesObject[entityType].map(entity => {
        let metricsObject = {};
        entityMetrics.forEach(metric => metricsObject[metric.name] = entity[`avg_${metric.name}`]);
        return {
            name: entity.reviewedName,
            reviews: entity.number_of_reviews,
            ...(entity.providerType && { roles: entity.providerType }),
            ...metricsObject
        };
    }
    );

    const headers = [
        { text: `${entityType} Name`, align: "start", sortable: false, value: "name" },
        { text: "# of Reviews", align: "center", sortable: false, value: "reviews" }
    ];
    entityType === "providers" && headers.push({ text: "Roles", align: "center", sortable: true, value: "roles" });

    headers.push(...entityMetrics.map(metric => ({ text: metric.text, align: metric.align, sortable: metric.sortable, value: metric.value })));
    return { headers, items };
}

export const parseReviewsTable = (reviewsArray) => {
    if (!reviewsArray.length) return {};
    // extract unecessary keys
    const { updatedAt, reviewerId, reviewedId, note, id, generatedBy, ...review } = reviewsArray[0];
    let keys = Object.keys(review);
    const items = reviewsArray.map(review => {

        let metricsObject = {};
        keys.forEach(metric => metricsObject[metric] = review[metric]);
        return {
            ...metricsObject
        };
    });

    const headers = [
        { text: `Reviewer Name`, align: "start", value: "reviewerName" },
        { text: `Reviewed`, align: "start", value: "reviewedName" },
        { text: `Score`, value: "score" },
    ];

    keys = keys.filter(checker(["reviewerName", "reviewedName", "score"]));
    headers.push(...keys.map(metric => ({ text: metric, value: metric })));

    return { headers, items };
}

export const parseProvidersTable = (providers) => {
    return providers.map(
        ({ reviewedName, number_of_reviews, providerType, avg_servicesUtility, avg_sales, avg_score, ...behavioralObj }) => {
            const behavioral = getAverageBehavior(behavioralObj);
            return {
                name: reviewedName,
                roles: providerType,
                score: parseInt(avg_score),
                services: parseInt(avg_servicesUtility) || 0,
                sales: avg_sales?.toFixed(2) || 0,
                behavioral,
            };
        }
    );

}

export const parseConsumersTable = (consumers) => {
    return consumers.map(
        ({ reviewedName, number_of_reviews, avg_payments, avg_score, ...behavioralObj }) => {
            const services = ["Food", " Dental", " Health Check"];
            services.length = services.length - parseInt(Math.random() * 3);
            const behavioral = getAverageBehavior(behavioralObj);
            return {
                name: reviewedName,
                // TODO: Work out recent used services from billing mapping.
                services,
                payments: parseInt(avg_payments * 1000),
                score: avg_score,
                behavioral,
            };
        }
    );

}

const getAverageBehavior = (obj) => {
    const {
        avg_responseQuality = 0,
        avg_reachability = 0,
        avg_punctuality = 0,
        avg_cleanliness = 0,
        avg_availability = 0,
        avg_manner = 0,
        avg_communication = 0
    } = obj;
    return Number(((
        avg_responseQuality +
        avg_reachability +
        avg_punctuality +
        avg_cleanliness +
        avg_availability +
        avg_manner +
        avg_communication
    ) / Object.keys(obj).length
    ).toFixed(1)
    )
}

const checker = (array) => (value) =>
    !array.some(element => value === element);
