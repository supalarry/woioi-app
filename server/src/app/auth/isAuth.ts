import { MiddlewareFn } from "type-graphql";
import { AppContext } from '../../interfaces/AppContext';
import { verify } from 'jsonwebtoken';

/* expected authorization token is 'bearer token123123123' */

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    /* Because we pass appcontext we have autocompletion on req object */
    if (!authorization) {
        throw new Error('Not authenticated');
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (error) {
        throw new Error(error);
    }
    return next();
}