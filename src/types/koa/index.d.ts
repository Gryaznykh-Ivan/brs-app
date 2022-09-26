import { Request } from 'koa'

declare module "koa" {
    interface Request {
        user?: any;
    }
}