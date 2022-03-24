import metrics from "../../metrics.json"

// TODO: refactor metrics to start with that exactly
// TODO: move out stars so its independant, maybe from metrics
export const parseEntitiesTable = (entitiesObject, entityType = "facilities") => {
    let restObj;
    const entityMetrics = entityType === "providers" ? metrics[entityType]["front-facing"] : metrics[entityType];
    const items = entitiesObject.map(entity => {
        let metricsObject = {};
        const { stars, rest } = getAverageStars(entity);
        restObj = rest;
        entityMetrics.forEach(metric => rest[metric.name] && (metricsObject[metric.name] = entity[`${metric.name}`]));
        return {
            name: entity.reviewedName,
            reviews: entity.number_of_reviews,
            score: entity.score,
            ...(entity.providerType && { roles: entity.providerType }),
            ...metricsObject,
            stars
        };
    }
    );

    const headers = [
        { text: `${entityType} Name`, align: "start", sortable: false, value: "name" },
        { text: "# of Reviews", align: "center", sortable: false, value: "reviews" },
    ];
    if (entityType === "providers") {
        headers.push({ text: "Roles", align: "center", sortable: false, value: "roles" })
    }
    headers.push({ text: `Score (%)`, align: "center", sortable: true, value: "score" })
    headers.push({ text: "Average Stars", align: "center", sortable: false, value: "stars" })
    headers.push(...entityMetrics.filter(metric => restObj[metric.name] || restObj[metric.name] === null).map(metric => metric.name && ({ text: metric.text, align: metric.align, sortable: metric.sortable, value: metric.value })));
    return { headers, items };
}

export const parseReviewsTable = (reviewsArray) => {
    if (!reviewsArray.length) return {};
    // extract unecessary keys
    let restObj;
    const { updatedAt, reviewerId, reviewedId, note, id, generatedBy, ...review } = reviewsArray[0];
    let keys = Object.keys(review);
    const items = reviewsArray.map(review => {

        let metricsObject = {};
        const { stars, rest } = getAverageStars(review);
        restObj = rest;
        keys.forEach(metric => rest[metric] && (metricsObject[metric] = review[metric]));

        return {
            ...metricsObject,
            stars
        };
    });

    const headers = [
        { text: `Reviewer Name`, align: "start", value: "reviewerName" },
        { text: `Reviewed`, align: "start", value: "reviewedName" },
        { text: `Score`, align: "center", value: "score" },
        { text: `Average Stars`, align: "center", sortable: false, value: "stars" },
    ];

    keys = keys.filter(checker(["reviewerName", "reviewedName", "score"]));
    headers.push(...keys.filter(metric => restObj[metric] || restObj[metric] === null).map(metric => ({ text: metric, value: metric })));

    return { headers, items };
}

export const parseProvidersTable = (providers) => {
    const items = providers.map(
        ({ reviewedName, number_of_reviews, providerType, servicesUtility, sales, score, ...starsObj }) => {
            const { stars } = getAverageStars(starsObj);
            return {
                name: reviewedName,
                roles: providerType,
                score: parseInt(score),
                services: parseInt(servicesUtility) || 0,
                sales: sales?.toFixed(2) || 0,
                stars,
            };
        }
    );
    const headers = [
        {
            text: "Full Name",
            align: "start",
            sortable: false,
            value: "name",
        },
        { text: "Roles", sortable: false, align: "center", value: "roles" },
        { text: "Score (%)", sortable: false, align: "center", value: "score" },
        {
            text: "Stars (%)",
            sortable: false,
            align: "center",
            value: "stars",
        }
    ];

    return { headers, items };

}

export const parseConsumersTable = (consumers) => {
    const items = consumers.map(
        ({ reviewedName, number_of_reviews, payments, score, ...starsObj }) => {
            const services = ["Food", " Dental", " Health Check"];
            services.length = services.length - parseInt(Math.random() * 3);
            const { stars } = getAverageStars(starsObj);
            return {
                name: reviewedName,
                // TODO: Work out recent used services from billing mapping.
                services,
                payments: parseInt(payments * 1000),
                score: score,
                stars,
            };
        }
    );

    const headers = [
        {
            text: "Full Name",
            align: "start",
            sortable: false,
            value: "name",
        },
        { text: "Score (%)", sortable: false, align: "center", value: "score" },
        {
            text: "Stars (%)",
            sortable: false,
            align: "center",
            value: "stars",
        }
    ];
    return { headers, items };
}

const getAverageStars = (obj) => {
    const {
        responseQuality = 0,
        reachability = 0,
        punctuality = 0,
        durability = 0,
        cleanliness = 0,
        availability = 0,
        manner = 0,
        communication = 0,
        returningCustomers = 0,
        ...rest
    } = obj;
    return {
        stars: (
            (
                responseQuality +
                reachability +
                punctuality +
                durability +
                cleanliness +
                availability +
                manner +
                communication +
                returningCustomers
            ) / (Object.keys(obj).length - Object.keys(rest).length)
        ).toFixed(1),
        rest
    }

}

const checker = (array) => (value) =>
    !array.some(element => value === element);
