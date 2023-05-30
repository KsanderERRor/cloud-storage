import { IDataFilter,IQuery,ISizeFilter,IfilterQuery } from "../../types/apiRestGraphQl/file/types";

function buildFilterQuery(query: IQuery) {
  const sizeFilter: ISizeFilter = {};
  const dataFilter: IDataFilter = {};
  const filterQuery: IfilterQuery = {};
  if (query.size_gte) {
    sizeFilter.$gte = query.size_gte;
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
    filterQuery.user = query.user;
  }

  if (Object.keys(sizeFilter).length) {
    filterQuery.size = sizeFilter;
  }

  if (Object.keys(dataFilter).length) {
    filterQuery.createdAt = dataFilter;
  }

  return filterQuery;
}

export default buildFilterQuery;
