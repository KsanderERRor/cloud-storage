import { IFileInput } from '../../data-base/file';
interface IQuery {
  name: string;
  size_gte: number;
  size_lte: number;
  date_gte: Date;
  date_lte: Date;
  user: IFileInput['user'];
}
interface ISizeFilter {
  $gte?: number;
  $lte?: number;
}
interface IDataFilter {
  $gte?: Date;
  $lte?: Date;
}
interface IfilterQuery {
  name?: IQuery['name'];
  user?: IQuery['user'];
  size?: ISizeFilter;
  createdAt?: IDataFilter;
}

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
