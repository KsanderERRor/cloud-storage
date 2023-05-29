import { Request, Response, NextFunction } from 'express';
interface RequestQuery {
  foo: string;
}
interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}
function getHandler(request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response: Response) {
  const { query } = request;

  query.foo; // string
}
