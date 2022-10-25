import { Prisma } from "@prisma/client";
import { Context } from "koa";
import validator from "validator";
import prisma from "../db";
import { AddStudentToGroupRequest, ChangeGroupRequest, CreateGroupRequest, GetByIdRequest, GetBySearchRequest, IdParamsRequest, RemoveStudentFromGroupRequest, UserRoles } from "../types/requestTypes";
import { BadRequest, Created, Ok } from "../utils/response";

const getGroupById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params;

    const group = await prisma.group.findFirst({
        where: { id },
        include: {
            students: {
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
        students: group.students
    });
}

const getUserGroup = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.query;
    
    const group = await prisma.group.findFirst({
        where: { students: { some: { id }}},
        include: {
            students: {
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
        students: group.students
    });
}

const getGroupsBySearch = async (ctx: Context) => {
    const { q = "", limit = 10, skip = 0, exclude } = <GetBySearchRequest>ctx.query;

    const whereCondition = {
        id: q.length > 0 ? q : undefined,
    }

    if (exclude !== undefined) {
        Object.assign(whereCondition, {
            subjects: {
                none: {
                    id: exclude
                }
            }
        })
    }

    const groups = await prisma.group.findMany({
        skip: Number(skip),
        take: Number(limit),
        where: whereCondition,
        orderBy: [{ createdAt: 'desc' }],
        select: {
            id: true,
            faculty: true,
            foundingDate: true,
            _count: {
                select: {
                    students: true
                }
            }
        }
    })

    const result = groups.map(group => ({
        id: group.id,
        faculty: group.faculty,
        foundingDate: group.foundingDate,
        studentsCount: group._count.students
    }))

    return Ok(ctx, result)
}


const addStudentToGroup = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: userId } = <AddStudentToGroupRequest>ctx.request.body;

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
                groupId: id
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
    const { id: userId } = <RemoveStudentFromGroupRequest>ctx.request.body;

    const user = await prisma.user.findFirst({ where: { id: userId, groupId: id } });
    if (user === null) {
        return BadRequest(ctx, "Пользователь не найден")
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                groupId: null
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

const createGroup = async (ctx: Context) => {
    const { id } = <CreateGroupRequest>ctx.request.body;

    const group = await prisma.group.findFirst({ where: { id } })
    if (group !== null) {
        return BadRequest(ctx, `Группа ${id} уже существует`)
    }

    try {
        await prisma.group.create({
            data: {
                id
            }
        })

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Создать группу не удалось. Попробуйте позже или обратитесь к администратору")
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

        return Ok(ctx);
    } catch (e) {
        return BadRequest(ctx, "Удалить группу не удалось")
    }
}


export = {
    getGroupById,
    getUserGroup,
    getGroupsBySearch,
    addStudentToGroup,
    removeStudentFromGroup,
    createGroup,
    changeGroupSettings,
    removeGroup
}