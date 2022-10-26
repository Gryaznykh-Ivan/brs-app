import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from '../db'
import { ChangeUserRequest, CreateUserRequest, IdParamsRequest, UserRoles } from '../types/requestTypes'
import { BadRequest, Ok } from '../utils/response'

const createUser = async (ctx: Context) => {
    const { email, password, birthday, name, lastName, group, role } = <CreateUserRequest>ctx.request.body;

    if (!validator.isEmail(email)) {
        return BadRequest(ctx, "Email указан неверно");
    }

    if (validator.isEmpty(name) || validator.isEmpty(lastName)) {
        return BadRequest(ctx, "Фамилия/Имя указано неверно");
    }

    if (Object.keys(UserRoles).includes(role) !== true) {
        return BadRequest(ctx, "Роль указана неверно");
    }

    if (validator.isEmpty(group) === false) {
        const userGroup = await prisma.group.findFirst({ where: { id: group } })
        if (userGroup === null) {
            return BadRequest(ctx, "Указанной группы пока нет в базе данных. Обратитесь к администратору")
        }
    }

    if (validator.isEmpty(password) === false) {
        if (!validator.isStrongPassword(password)) {
            return BadRequest(ctx, "Password указан неверно. Минимальная длина 8. Минимум 1 буква в нижнем регистре. Минимум 1 буква в верхнем регистре. Минимум 1 символ. Минимум 1 число.");
        }
    }


    try {
        await prisma.user.create({
            data: {
                email,
                name,
                FIO: `${lastName} ${name}`,
                lastName: lastName,
                birthday: validator.isEmpty(birthday) === false ? new Date(birthday) : null,
                password: validator.isEmpty(password) === false ? await bcrypt.hash(password, 8) : null,
                groupId: validator.isEmpty(group) === false ? group : null,
                role: role
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

const changeUserSettings = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { email, password, birthday, name, lastName, group, role } = <ChangeUserRequest>ctx.request.body;

    if (!validator.isEmail(email)) {
        return BadRequest(ctx, "Email указан неверно");
    }

    if (validator.isEmpty(name) || validator.isEmpty(lastName)) {
        return BadRequest(ctx, "Фамилия/Имя указано неверно");
    }

    if (Object.keys(UserRoles).includes(role) !== true) {
        return BadRequest(ctx, "Роль указана неверно");
    }

    if (validator.isEmpty(group) === false) {
        const userGroup = await prisma.group.findFirst({ where: { id: group } })
        if (userGroup === null) {
            return BadRequest(ctx, "Указанной группы пока нет в базе данных. Обратитесь к администратору")
        }
    }

    if (validator.isEmpty(password) === false) {
        if (!validator.isStrongPassword(password)) {
            return BadRequest(ctx, "Password указан неверно. Минимальная длина 8. Минимум 1 буква в нижнем регистре. Минимум 1 буква в верхнем регистре. Минимум 1 символ. Минимум 1 число.");
        }
    }

    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден");
    }

    try {

        await prisma.user.update(
            {
                where: { id },
                data: {
                    email,
                    name,
                    FIO: `${lastName} ${name}`,
                    lastName: lastName,
                    birthday: validator.isEmpty(birthday) === false ? new Date(birthday) : undefined,
                    password: validator.isEmpty(password) === false ? await bcrypt.hash(password, 8) : undefined,
                    groupId: validator.isEmpty(group) === false ? group : undefined,
                    role: role
                }
            })

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return BadRequest(ctx, "Пользователь с таким email уже существует")
            } else {
                return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
            }
        }

        throw e
    }
}

const removeUser = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;

    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден");
    }

    try {
        await prisma.user.delete({ where: { id } })
    } catch (e) {
        return BadRequest(ctx, "Удалить пользователя не удалось")
    }

    return Ok(ctx);
}


export = {
    createUser,
    changeUserSettings,
    removeUser
}