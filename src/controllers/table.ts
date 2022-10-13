import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import validator from 'validator'
import prisma from '../db'
import { AddColumnRequest, ChangeColumnRequest, CreateGroupRequest, CreateTableRequest, GetByIdRequest, GetTablesNameRequest, IdParamsRequest, RemoveColumnRequest, RemoveTableRequest, SetMarkRequest } from '../types/requestTypes'
import { BadRequest, Ok } from '../utils/response'

const getTableNames = async (ctx: Context) => {
    const { groupId, subjectId } = <GetTablesNameRequest>ctx.request.query

    const tables = await prisma.table.findMany({
        where: { groupId, subjectId },
        select: { 
            id: true,
            title: true
        }
    })

    return Ok(ctx, tables)
}

const getTableById = async (ctx: Context) => {
    const { id } = <GetByIdRequest>ctx.params;

    const table = await prisma.table.findFirst({
        where: { id },
        include: {
            columns: {
                select: {
                    id: true,
                    title: true
                }
            },
            group: {
                include: {
                    students: {
                        orderBy: [{
                            lastName: "asc"
                        }],
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
            },
            subject: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

    if (table === null) {
        return BadRequest(ctx, "Таблица не найден")
    }

    const marks = await prisma.mark.groupBy({
        by: ['title'],
        where: {
            tableId: id
        }
    })


    const result = {
        ...table,
        marks
    }

    return Ok(ctx, result);
}

const createTable = async (ctx: Context) => {
    const { title, groupId, subjectId } = <CreateTableRequest>ctx.request.body;

    if (validator.isEmpty(title) === true) {
        return BadRequest(ctx, "Название столбца не может быть пустым")
    }

    const subject = await prisma.subject.findFirst({ where: { id: subjectId } })
    if (subject === null) {
        return BadRequest(ctx, "Дисциплина не найден");
    }

    const group = await prisma.group.findFirst({ where: { id: groupId } })
    if (group === null) {
        return BadRequest(ctx, "Группа не найден");
    }

    try {
        await prisma.table.create({
            data: {
                title,
                subjectId,
                groupId
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Создать таблицу не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

const removeTable = async (ctx: Context) => {
    const { id } = <RemoveTableRequest>ctx.params

    const table = await prisma.table.findFirst({ where: { id } })
    if (table === null) {
        return BadRequest(ctx, "Таблица не найден");
    }

    try {
        await prisma.table.delete({ where: { id } })

        return Ok(ctx);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Удалить таблицу не удалось")
        }

        throw e
    }

}

const addColumn = async (ctx: Context) => {
    const { tableId, title } = <AddColumnRequest>ctx.request.body

    if (validator.isEmpty(title) === true) {
        return BadRequest(ctx, "Название столбца не может быть пустым")
    }

    const table = await prisma.table.findFirst({ where: { id: tableId } })
    if (table === null) {
        return BadRequest(ctx, "Таблица не найден");
    }

    try {
        await prisma.column.create({
            data: {
                title,
                tableId
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Создать столбец не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }

}

const removeColumn = async (ctx: Context) => {
    const { id } = <RemoveColumnRequest>ctx.params

    const column = await prisma.column.findFirst({ where: { id } })
    if (column === null) {
        return BadRequest(ctx, "Столбец не найден");
    }

    try {
        await prisma.$transaction([
            prisma.column.delete({ where: { id } }),
            prisma.mark.deleteMany({ where: { title: column.title } })
        ])

        return Ok(ctx);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Удалить столбец не удалось")
        }

        throw e
    }
}

const changeColumnName = async (ctx: Context) => {
    const { id } = <IdParamsRequest>ctx.params;
    const { id: columnId, title } = <ChangeColumnRequest>ctx.request.body;

    if (validator.isEmpty(title) === true) {
        return BadRequest(ctx, "Название столбца не может быть пустым")
    }

    const column = await prisma.column.findFirst({ where: { id: columnId, tableId: id } })
    if (column === null) {
        return BadRequest(ctx, "Столбец не найден");
    }

    try {
        await prisma.$transaction([
            prisma.column.update({
                where: { id: columnId },
                data: {
                    title
                }
            }),
            prisma.mark.updateMany({ where: { title: column.title }, data: { title } })
        ])

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

const setMark = async (ctx: Context) => {
    const { tableId, title, userId, value } = <SetMarkRequest>ctx.request.body;

    const table = await prisma.table.findFirst({
        where: {
            id: tableId,
            group: {
                students: {
                    some: { id: userId }
                }
            }
        }
    })

    if (table === null) {
        return BadRequest(ctx, "Таблица не найден");
    }

    const column = await prisma.column.findFirst({ where: { tableId, title } })
    if (column === null) {
        return BadRequest(ctx, "Столбец не найден");
    }

    const mark = await prisma.mark.findFirst({ where: { tableId, title, userId } })

    try {
        await prisma.mark.upsert({
            where: {
                id: mark?.id
            },
            update: {
                tableId,
                userId,
                title,
                value
            },
            create: {
                tableId,
                userId,
                title,
                value
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

export = {
    getTableNames,
    getTableById,
    createTable,
    removeTable,
    addColumn,
    removeColumn,
    changeColumnName,
    setMark
}