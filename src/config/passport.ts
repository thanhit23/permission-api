import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';

import db from '@/database';
import { TokenTypes } from './tokens';
import { QueryError } from 'mysql2';
import User from '@/Model/User';

const jwtOptions = {
  secretOrKey: 'SECRET',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }

    const query = `SELECT * FROM Users WHERE id = ${payload.sub} LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.query(query, (err: QueryError, results: User[]) => {
        
        if (err) {
          done(null, false);
          reject();
        }
  
        if (results.length >= 1) {
          done(null, results[0]);
          resolve()
        }
      });
    })
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
