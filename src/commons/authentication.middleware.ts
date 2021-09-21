import { NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req, res, next) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.DOMAIN,
      }),

      audience: 'http://localhost:3000',
      issuer: process.env.ISSUER,
      algorithms: ['RS256'],
    })(req, res, err => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  };
}