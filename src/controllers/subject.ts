import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import prisma from '../db'
import { AddGroupToSubjectRequest, ChangeSubjectRequest, CreateSubjectRequest, GetByIdRequest, GetBySearchRequest, IdParamsRequest, RemoveGroupFromSubjectRequest, UserRoles } from '../types/requestTypes'
import { BadRequest, Ok } from '../utils/response'

const getSubjectById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params

    const subject = await prisma.subject.findFirst({
        where: { id },
        include: {
            Groups: {
                select: {
                    id: true,
                }
            }
        }
    })

    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найдена")
    }

    return Ok(ctx, subject)
}

const getSubjectBySearch = async (ctx: Context) => {
    const { q = "", limit = 10, skip = 0 } = <GetBySearchRequest>ctx.query;

    const subjects = await prisma.subject.findMany({
        skip: Number(skip),
        take: Number(limit),
        where: {
            title: {
                search: q.length > 0 ? q : undefined
            },
            createdByFIO: {
                search: q.length > 0 ? q : undefined
            }
        },
        select: {
            id: true,
            createdByFIO: true,
            title: true,
            type: true,
            updatedAt: true
        },
        orderBy: [{ createdAt: 'desc' }]
    })

    return Ok(ctx, subjects)
}

const createSubject = async (ctx: Context) => {
    const { createdBy, title, type } = <CreateSubjectRequest>ctx.request.body

    const user = await prisma.user.findFirst({ where: { id: createdBy }})
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    if (user.role === UserRoles.STUDENT || user.role === UserRoles.HEADMAN) {
        return BadRequest(ctx, "У вас нет прав на создание дисциплины")
    }

    try {
        await prisma.subject.create({ data: { createdById: createdBy, title, type, createdByFIO: user.FIO }});

        return Ok(ctx);
    } catch (e) {
        return BadRequest(ctx, "При создании дисциплины произошла ошибка. Попробуйте позже или обратитесь к администратору")
    }
}

const removeSubject = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;

    const subject = await prisma.subject.findFirst({ where: { id }})
    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найден");
    }

    try {
        await prisma.subject.delete({ where: { id } })

        return Ok(ctx);
    } catch (e) {
        return BadRequest(ctx, "Удалить дисциплину не удалось")
    }
}

const addGroupToSubject = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: groupId } = <AddGroupToSubjectRequest>ctx.request.body;

    const group = await prisma.group.findFirst({ where: { id: groupId } });
    if (group === null) {
        return BadRequest(ctx, "Группа не найдена")
    }

    const subject = await prisma.subject.findFirst({ where: { id } })
    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найдена")
    }

    try {
        await prisma.group.update({
            where: { id: groupId },
            data: {
                Subjects: {
                    connect: {
                        id
                    }
                }
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

const removeGroupFromSubject = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: groupId } = <RemoveGroupFromSubjectRequest>ctx.request.body;

    const group = await prisma.group.findFirst({ where: { id: groupId } });
    if (group === null) {
        return BadRequest(ctx, "Группа не найдена")
    }

    const subject = await prisma.subject.findFirst({ where: { id } })
    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найдена")
    }

    try {
        await prisma.group.update({
            where: { id: groupId },
            data: {
                Subjects: {
                    disconnect: {
                        id
                    }
                }
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

const changeSubjectSettings = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { type, title } = <ChangeSubjectRequest>ctx.request.body;

    try {
        await prisma.subject.update({
            where: { id },
            data: {
                type,
                title
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

export = {
    getSubjectById,
    getSubjectBySearch,
    createSubject,
    removeSubject,
    addGroupToSubject,
    removeGroupFromSubject,
    changeSubjectSettings
}