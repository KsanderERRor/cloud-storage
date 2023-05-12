const mongoose = require('mongoose');

function buildFilterQuery(query = {}) {
  const sizeFilter = {};
  const dataFilter = {};
  const filterQuery = {};
  if (query.size_gte) {
    sizeFilter.$gte = Number(query.size_gte);
  }

  if (query.size_lte) {
    sizeFilter.$lte = Number(query.size_lte);
  }

  if (query.date_gte) {
    dataFilter.$gte = query.date_gte;
  }

  if (query.date_lte) {
    dataFilter.$lte = query.date_lte;
  }

  if (query.name) {
    filterQuery.name = query.name;
  }
  if (query.user) {
    const id = query.user;
    const convertID = new mongoose.Types.ObjectId(id);
    // const a =  new mongodb.ObjectId(convert);

    filterQuery.user = convertID;
  }

  if (Object.keys(sizeFilter).length) {
    filterQuery.size = sizeFilter;
  }

  if (Object.keys(dataFilter).length) {
    filterQuery.createdAt = dataFilter;
  }
  console.log(filterQuery.createdAt);

  return filterQuery;
}

module.exports = {
  buildFilterQuery
};
