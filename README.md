# @openapi-ts/express
Express implementation for [@openapi-ts/backend](http://npmjs.com/package/@openapi-ts/backend)

## Installation

```
$ npm install @openapi-ts/express
```

## Usage

This module extends `@openapi-ts/backend` with an Express sub-class of the OpenApi class, and
provides bindings between Express request handlers and the OpenApi instance so that incoming
requests may be easily routed to the operations registered on the OpenApi instance.

The module exports all the members from `@openapi-ts/backend` to make for a single clear interface.

Minimal example:

```
import {app} from 'express';
import {ExpressOpenApi} from '@openapi-ts/express';

const api = new ExpressOpenApi().register({
  definition: 'path/to/open-api.yml',
  operations: {
    async getPet(req, res, params) {
      // return a pet
    }
  }
});

const app = express();
app.use(api.requestHandler());
```

## Credits

Thanks go to @keithbro for suggesting support for Express and providing code as inspiration for the implementation. 


