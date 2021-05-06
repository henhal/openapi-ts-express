import * as Express from "express";
import {OpenApi} from '@openapi-ts/backend';
import {applyResponse, buildRequest} from 'src/converters';

export type ExpressSource = {
  express: {
    req: Express.Request;
    res: Express.Response;
  }
};

export function expressRequestHandler<T>(api: OpenApi<any>, ...args: T[]): Express.RequestHandler {
  const [data] = args;

  return async (req, res) => {
    const source: ExpressSource = {
      express: {req, res}
    };

    const rawRes = await api.handleRequest(buildRequest(req), {
      ...source,
      ...data
    });

    applyResponse(rawRes, res);
  };
}

export class ExpressOpenApi<T> extends OpenApi<ExpressSource & T> {
  /**
   * Create an Express request handler function that routes Express requests to operations registered on this
   * OpenApi instance.
   *
   * @param args if T is an object, a single argument of type T, otherwise no arguments
   * @return an Express request handler function
   */
  requestHandler(...args: T[]) {
    return expressRequestHandler(this, ...args);
  }
}