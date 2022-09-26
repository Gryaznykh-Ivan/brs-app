import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import sha256 from 'sha256'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { BadRequest, Ok, Unauthorized } from '../utils/response'
import prisma from '../db'
import { sendCode } from '../utils/mailer'
import { LoginRequest, LoginThroughEmailRequest, RegisterRequest, SendVerificationCodeRequest } from '../types/requestTypes'

const login = async (ctx: Context) => {
    const { email, password } = <LoginRequest>ctx.request.body;

    const user = await prisma.user.findFirst({ where: { email }});
    if (user === null) {
        return BadRequest(ctx, "Пользователя с таким email не существует");
    }

    if (user.password === null) {
        return BadRequest(ctx, "Вам необходимо авторизоваться через email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match === false) {
        return BadRequest(ctx, "Пароль указан неверно");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET as string, { expiresIn: "7d" });

    return Ok(ctx, token);
}

const loginThroughEmail = async (ctx: Context) => {
    const { email, code } = <LoginThroughEmailRequest>ctx.request.body;

    const user = await prisma.user.findFirst({ where: { email }});
    if (user === null) {
        return BadRequest(ctx, "Пользователя с таким email не существует");
    }

    if (user.code === null) {
        return BadRequest(ctx, "Произошла ошибка при проверке кода подтверждения");
    }

    const match = await bcrypt.compare(code, user.code);
    if (match === false) {
        return BadRequest(ctx, "Неверный код подтверждения");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET as string, { expiresIn: "7d" });

    return Ok(ctx, token);
}

const sendVerificationCode = async (ctx: Context) => {
    const { email } = <SendVerificationCodeRequest>ctx.request.body;

    if (!validator.isEmail(email)) {
        return BadRequest(ctx, "Email указан неверно");
    }

    const user = await prisma.user.findFirst({ where: { email }});
    if (user === null) {
        return BadRequest(ctx, "Пользователя с таким Email не существует");
    }

    const { success, data } = await sendCode(user.email);
    if (success === false) {
        return BadRequest(ctx, "Отправить код на почту не удалось. Попробуйте другой способ авторизации.");
    }
    
    const hash = await bcrypt.hash(data as string, 8)

    try {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                code: hash
            }
        });

        return Ok(ctx, email);
    } catch (e) {
        return BadRequest(ctx, "Произошла ошибка при содании кода подтверждения. Попробуйте позже.");
    }
}



const register = async (ctx: Context) => {
    const { email, password, birthday, name, lastName, group } = <RegisterRequest>ctx.request.body;

    if (!validator.isEmail(email)) {
        return BadRequest(ctx, "Email указан неверно");
    }

    if (!validator.isStrongPassword(password)) {
        return BadRequest(ctx, "Password указан неверно. Минимальная длина 8. Минимум 1 буква в нижнем регистре. Минимум 1 буква в верхнем регистре. Минимум 1 символ. Минимум 1 число.");
    }

    if (!validator.isDate(birthday)) {
        return BadRequest(ctx, "Дата рождения указан неверно");
    }

    if (validator.isEmpty(name) || validator.isEmpty(lastName)) {
        return BadRequest(ctx, "Фамилия/Имя указано неверно");
    }

    if (validator.isEmpty(group) === false) {
        const userGroup = await prisma.group.findFirst({ where: { id: group }})
        if (userGroup === null) {
            return BadRequest(ctx, "Указанной группы пока нет в базе данных. Обратитесь к администратору")
        }
    }

    const hash = await bcrypt.hash(password, 8);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                FIO: `${ lastName } ${ name }`,
                group: validator.isEmpty(group) ? null : group,
                password: hash,
                lastName: lastName,
                birthday: new Date(birthday),
            }
        });

        return Ok(ctx);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return BadRequest(ctx, "Пользователь с таким email уже существует")
            }
        }

        throw e
    }
}


export = {
    register, login, sendVerificationCode, loginThroughEmail
}