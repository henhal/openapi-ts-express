import {RawRequest, RawResponse, StringParams} from '@openapi-ts/backend';
import * as Express from 'express';

function toStringParams(obj: Record<string, unknown>): StringParams {
  // Since headers and queries may be single or multiple, our Params are string | string[]. If multiple values are
  // provided we keep it as a string array, but if a single value is provided we keep it as a string.
  return Object.fromEntries(Object.entries(obj)
      .filter(([, v]) => v != null)
      .map(([k, v]) => {
        if (Array.isArray(v) && v.length === 1) {
          // Single item array is converted to single value
          v = v[0];
        }

        return [k, Array.isArray(v) ? v.map(e => String(e)) : String(v)];
      })) as StringParams;
}

export function buildRequest(req: Express.Request): RawRequest {
  return {
    method: req.method,
    path: req.path,
    query: toStringParams(req.query),
    headers: toStringParams(req.headers),
    body: req.body
  };
}

export function applyResponse(rawRes: RawResponse, res: Express.Response): void {
  res.statusCode = rawRes.statusCode;
  res.json(rawRes.body);
}