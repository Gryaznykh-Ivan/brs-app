import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import validator from 'validator'
import prisma from '../db'
import { AddGroupToSubjectRequest, ChangeSubjectRequest, CreateSubjectRequest, GetByIdRequest, GetBySearchRequest, IdParamsRequest, RemoveGroupFromSubjectRequest, UserRoles } from '../types/requestTypes'
import { BadRequest, Ok } from '../utils/response'

const getSubjectById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params

    const subject = await prisma.subject.findFirst({
        where: { id },
        include: {
            createdBy: {
                select: {
                    FIO: true
                }
            },
            groups: {
                select: {
                    id: true,
                    faculty: true,
                    foundingDate: true,
                    _count: {
                        select: {
                            strudents: true
                        }
                    }
                }
            }
        }
    })

    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найдена")
    }

    const result = {
        id: subject.id,
        title: subject.title,
        createdByFIO: subject.createdBy.FIO,
        type: subject.type,
        updatedAt: subject.updatedAt,
        Groups: subject.groups.map(group => ({
            id: group.id,
            faculty: group.faculty,
            foundingDate: group.foundingDate,
            studentsCount: group._count.strudents
        }))
    }

    return Ok(ctx, result)
}

const getSubjectBySearch = async (ctx: Context) => {
    const { q = "", limit = 10, skip = 0 } = <GetBySearchRequest>ctx.query;

    const subjects = await prisma.subject.findMany({
        skip: Number(skip),
        take: Number(limit),
        include: {
            createdBy: {
                select: {
                    FIO: true
                }
            }
        },
        where: {
            OR: [
                {
                    title: {
                        search: q.length > 0 ? q : undefined
                    }
                },
                {
                    createdBy: {
                        FIO: {
                            search: q.length > 0 ? q : undefined
                        }
                    }
                }
            ]
        },
        orderBy: [{ createdAt: 'desc' }]
    })

    const result = subjects.map(subject => ({
        id: subject.id,
        title: subject.title,
        createdByFIO: subject.createdBy.FIO,
        type: subject.type,
        updatedAt: subject.updatedAt
    }))

    return Ok(ctx, result)
}

const createSubject = async (ctx: Context) => {
    const { createdById, title, type } = <CreateSubjectRequest>ctx.request.body

    if (validator.isEmpty(title) === true) {
        return BadRequest(ctx, "Название курса не может быть пустым")
    }

    const user = await prisma.user.findFirst({ where: { id: createdById } })
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    try {
        await prisma.subject.create({
            data: {
                createdBy: {
                    connect: {
                        id: user.id
                    }
                },
                title,
                type
            }
        });

        return Ok(ctx);
    } catch (e) {
        console.log(e);
        return BadRequest(ctx, "При создании дисциплины произошла ошибка. Попробуйте позже или обратитесь к администратору")
    }
}

const removeSubject = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;

    const subject = await prisma.subject.findFirst({ where: { id } })
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
                subjects: {
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
                subjects: {
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