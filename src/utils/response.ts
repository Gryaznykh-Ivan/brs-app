import { Context } from "koa";

const NotFound = (ctx: Context, msg: string) => {
    ctx.status = 404;
    return ctx.body = {
        success: false,
        error: msg || "Not found"
    }
}

const Unauthorized  = (ctx: Context, msg: string) => {
    ctx.status = 401;
    return ctx.body = {
        success: false,
        error: msg || "Unauthorized"
    }
}

const BadRequest = (ctx: Context, msg: string) => {
    ctx.status = 400;
    return ctx.body = {
        success: false,
        error: msg || "Bad request"
    }
}

const Created = (ctx: Context, data?: any) => {
    ctx.status = 201;
    return ctx.body = {
        success: true,
        data
    }
}

const Ok = (ctx: Context, data?: any) => {
    return ctx.body = {
        success: true,
        data
    }
}

export {
    NotFound,
    BadRequest,
    Unauthorized,
    Created,
    Ok
}