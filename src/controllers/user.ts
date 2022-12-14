import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from '../db'
import { ChangePasswordRequest, GeneralSettingsChangeRequest, GetByIdRequest, GetBySearchRequest, UserRoles } from '../types/requestTypes'
import { BadRequest, Ok, Unauthorized } from '../utils/response'

const getUserById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params;

    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    return Ok(ctx, {
        id: user.id,
        name: user.name,
        FIO: user.FIO,
        lastName: user.lastName,
        birthday: user.birthday,
        email: user.email,
        groupId: user.groupId,
        role: user.role
    });
}

const getUsersBySearch = async (ctx: Context) => {
    const { q = "", limit = 10, skip = 0, exclude } = <GetBySearchRequest>ctx.query;

    const whereCondition = {
        FIO: {
            search: q.length > 0 ? q : undefined
        }
    }

    if (exclude !== undefined) {
        Object.assign(whereCondition, {
            groupId: null,
            NOT: {
                role: UserRoles.TEACHER
            }
        })
    }

    const users = await prisma.user.findMany({
        skip: Number(skip),
        take: Number(limit),
        where: whereCondition,
        select: {
            id: true,
            name: true,
            FIO: true,
            lastName: true,
            birthday: true,
            email: true,
            groupId: true,
            role: true
        }
    })

    return Ok(ctx, users)
}



const generalSettingsChange = async (ctx: Context) => {
    const { name, lastName, email, group, birthday } = <GeneralSettingsChangeRequest>ctx.request.body;
    const { id } = ctx.request.user;

    if (!validator.isEmail(email)) {
        return BadRequest(ctx, "Email указан неверно");
    }

    if (!validator.isDate(birthday)) {
        return BadRequest(ctx, "Дата рождения указана неверно");
    }

    if (validator.isEmpty(name) || validator.isEmpty(lastName)) {
        return BadRequest(ctx, "Фамилия/Имя указано неверно");
    }

    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
        return Unauthorized(ctx, "Произошла ошибка. Метод доступен только авторизированным пользователям");
    }

    const userGroup = await prisma.group.findFirst({ where: { id: group } })
    if (userGroup === null) {
        return BadRequest(ctx, "Указанной группы пока нет в базе данных. Обратитесь к администратору")
    }


    try {
        await prisma.user.update({ where: { id }, data: { name, lastName, email, groupId: group, birthday: new Date(birthday), FIO: `${lastName} ${name}` } })

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

const changePassword = async (ctx: Context) => {
    const { oldPassword, newPassword } = <ChangePasswordRequest>ctx.request.body;
    const { id } = ctx.request.user;

    if (!validator.isStrongPassword(newPassword)) {
        return BadRequest(ctx, "Password указан неверно. Введите пароль в соответствии с форматом");
    }

    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
        return Unauthorized(ctx, "Произошла ошибка. Метод доступен только авторизированным пользователям");
    }

    if (user.password === null) {
        const hash = await bcrypt.hash(newPassword, 8);

        try {
            await prisma.user.update({ where: { id }, data: { password: hash } })
            return Ok(ctx)
        } catch (e) {
            return BadRequest(ctx, "Произошла ошибка при попытке внести изменения. Попробуйте позже")
        }
    } else {
        if (oldPassword === newPassword) {
            return BadRequest(ctx, "Новый пароль должен отличаться от старого")
        }

        const match = await bcrypt.compare(oldPassword, user.password);
        if (match === false) {
            return BadRequest(ctx, "Старый пароль указан неверно");
        }

        const hash = await bcrypt.hash(newPassword, 8);

        try {
            await prisma.user.update({ where: { id }, data: { password: hash } })
            return Ok(ctx)
        } catch (e) {
            return BadRequest(ctx, "Произошла ошибка при попытке внести изменения. Попробуйте позже")
        }
    }
}



export = {
    getUserById,
    getUsersBySearch,
    generalSettingsChange,
    changePassword
}