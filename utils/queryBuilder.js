export const queryBuilder = (args) => Object.keys(args).map(key => !!args[key] ? `&${key}=${args[key]}` : "").join("");