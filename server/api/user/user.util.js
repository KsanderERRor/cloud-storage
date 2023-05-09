function buildFilterQuery(query = {}) {
  const discSpaceFilter = {};
  const userSpaceFilter = {};
  const filterQuery = {};
  if (query.discSpace_gte) {
    discSpaceFilter.$gte = Number(query.discSpace_gte);
  }

  if (query.discSpace_lte) {
    discSpaceFilter.$lte = Number(query.discSpace_lte);
  }

  if (query.userSpace_gte) {
    userSpaceFilter.$gte = query.userSpace_gte;
  }

  if (query.userSpace_lte) {
    userSpaceFilter.$lte = query.userSpace_lte;
  }

  if (query.email) {
    filterQuery.email = query.email;
  }

  if (Object.keys(discSpaceFilter).length) {
    filterQuery.discSpace = discSpaceFilter;
  }

  if (Object.keys(userSpaceFilter).length) {
    filterQuery.userSpace = userSpaceFilter;
  }

  return filterQuery;
}

module.exports = {
  buildFilterQuery
};
