import Koa from 'koa'
import KoaCors from '@koa/cors'
import KoaBodyParser from 'koa-bodyparser'
import Router from './routes'

const app = new Koa();

app.use(KoaCors());
app.use(KoaBodyParser());

app.use(Router.routes());
app.use(Router.allowedMethods());

const start = async () => {
    const PORT = process.env.PORT || 2000;

    app.listen(PORT, () => console.log("Сервер запущен и слушает порт:", PORT));
}

export default start;