import { Prisma } from "@prisma/client";
import { Context } from "koa";
import validator from "validator";
import prisma from "../db";
import { AddStudentToGroup, ChangeGroupRequest, GetByIdRequest, GetBySearchRequest, IdParamsRequest, RemoveStudentFromGroup, UserRoles } from "../types/requestTypes";
import { BadRequest, Created, Ok } from "../utils/response";

const getGroupById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params;

    const group = await prisma.group.findFirst({
        where: { id },
        include: {
            Strudents: {
                select: {
                    id: true,
                    name: true,
                    FIO: true,
                    lastName: true,
                    birthday: true,
                    email: true,
                    group: true,
                    role: true
                }
            }
        }
    })
    if (group === null) {
        return BadRequest(ctx, "Группа не найден")
    }

    return Ok(ctx, {
        id: group.id,
        faculty: group.faculty,
        foundingDate: group.foundingDate,
        students: group.Strudents
    });
}

const getGroupsBySearch = async (ctx: Context) => {
    const { q = "", limit = 10, skip = 0 } = <GetBySearchRequest>ctx.query;

    const groups = await prisma.group.findMany({
        skip: Number(skip),
        take: Number(limit),
        where: {
            id: q.length > 0 ? q : undefined
        },
        select: {
            id: true,
            faculty: true,
            foundingDate: true
        }
    })

    return Ok(ctx, groups)
}


const addStudentToGroup = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: userId } = <AddStudentToGroup>ctx.request.body;

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    if (user.role === UserRoles.TEACHER) {
        return BadRequest(ctx, "Учителей нельзя добавлять в группы студентов")
    }

    const group = await prisma.group.findFirst({ where: { id } })
    if (group === null) {
        return BadRequest(ctx, `Группа не найдена`)
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                group: id
            }
        })

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

const removeStudentFromGroup = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: userId } = <RemoveStudentFromGroup>ctx.request.body;

    const user = await prisma.user.findFirst({ where: { id: userId, group: id }});
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                group: null
            }
        })

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

const changeGroupSettings = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: newId, faculty, foundingDate } = <ChangeGroupRequest>ctx.request.body;

    if (Number.isNaN(+faculty) === true) {
        return BadRequest(ctx, "Факультет указан неверно")
    }

    if (!validator.isDate(foundingDate)) {
        return BadRequest(ctx, "Дата формирования группы указана неверно");
    }

    if (id !== newId) {
        const group = await prisma.group.findFirst({ where: { id: newId } })
        if (group !== null) {
            return BadRequest(ctx, `Группа ${newId} уже существует`)
        }
    }

    try {
        await prisma.group.update({
            where: { id },
            data: {
                id: newId,
                faculty: +faculty,
                foundingDate: new Date(foundingDate)
            }
        })

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

const removeGroup = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;

    const group = await prisma.group.findFirst({ where: { id } })
    if (group === null) {
        return BadRequest(ctx, "Группа не найден");
    }

    try {
        await prisma.group.delete({ where: { id } })
    } catch (e) {
        return BadRequest(ctx, "Удалить группу не удалось")
    }

    return Ok(ctx);
}


export = {
    getGroupById,
    getGroupsBySearch,
    addStudentToGroup,
    removeStudentFromGroup,
    changeGroupSettings,
    removeGroup
}