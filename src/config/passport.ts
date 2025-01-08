import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';

import DB from '@/database';
import Users from '@/model/Users';
import UserRoles from '@/model/UserRoles';

import { TokenTypes } from './tokens';

const jwtOptions = {
  secretOrKey: 'SECRET',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }

    const user = await DB.getEntityManager().findOne(Users, { id: payload.sub })

    if (!user) {
      done(null, false);
    }

    const role = await DB.getEntityManager().findOne(UserRoles, { user_id: user?.id })

    done(null, { ...user, role });
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
