import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { BadRequest, NotFound } from '../utils/response'

export default async (ctx: Context, next: Next) => {
    try {
        const token = ctx.request.headers['authorization']?.split(' ')[1];
        
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.SECRET as string);
            ctx.request.user = decoded;
        }

        return next();
    } catch(e: any) {
        ctx.throw(e.status, e.message);
    }
}