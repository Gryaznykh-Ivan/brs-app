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

const getStudentTableNames = async (ctx: Context) => {
    const { id } = ctx.request.user
    const { subjectId } = <GetTablesNameRequest>ctx.request.query

    const tables = await prisma.table.findMany({
        where: {
            subjectId,
            group: {
                students: {
                    some: {
                        id
                    }
                }
            }
        },
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
                include: {
                    marks: {
                        select: {
                            id: true,
                            columnId: true,
                            userId: true,
                            value: true
                        }
                    }
                },
                orderBy: [{
                    createdAt: "asc"
                }],
            },
            subject: {
                select: {
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
                            FIO: true
                        }
                    }
                }
            }
        }
    })

    if (table === null) {
        return BadRequest(ctx, "Таблица не найден")
    }


    const result = {
        id: table.id,
        title: table.title,
        subjectId: table.subjectId,
        groupId: table.groupId,
        columns: table.columns.map(column => ({ id: column.id, title: column.title })),
        students: table.group.students,
        subjectTitle: table.subject.title,
        marks: table.columns.reduce<{ id: string; columnId: string; userId: string; value: number; }[]>((a,c) => {
            c.marks.forEach(mark => a.push(mark))
            return a
        }, [])
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

        return Ok(ctx)
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

        return Ok(ctx)
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
        await prisma.column.delete({ where: { id } })

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
    const { columnId, title } = <ChangeColumnRequest>ctx.request.body;

    if (validator.isEmpty(title) === true) {
        return BadRequest(ctx, "Название столбца не может быть пустым")
    }

    if (title.length > 16) {
        return BadRequest(ctx, "Название столбца не должно превышать 16 символов")
    }

    const column = await prisma.column.findFirst({ where: { id: columnId, tableId: id } })
    if (column === null) {
        return BadRequest(ctx, "Столбец не найден");
    }

    try {
        await prisma.column.update({
            where: { id: columnId },
            data: {
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

const setMark = async (ctx: Context) => {
    const { tableId, columnId, userId, value } = <SetMarkRequest>ctx.request.body;

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

    const column = await prisma.column.findFirst({ where: { id: columnId } })
    if (column === null) {
        return BadRequest(ctx, "Столбец не найден");
    }

    const mark = await prisma.mark.findFirst({ where: { columnId, userId } })

    try {
        if (mark === null) {
            if (value === null) {
                return Ok(ctx)
            }

            await prisma.mark.create({ data: { userId, columnId, value }})
        } else {
            if (value === null) {
                await prisma.mark.delete({ where: { id: mark.id } })
    
                return Ok(ctx)
            }

            await prisma.mark.update({
                where: { id: mark.id },
                data: {
                    value
                }
            })
        }

        return Ok(ctx)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return BadRequest(ctx, "Обновить данные не удалось. Попробуйте позже или обратитесь к администратору")
        }

        throw e
    }
}

export = {
    getTableNames,
    getStudentTableNames,
    getTableById,
    createTable,
    removeTable,
    addColumn,
    removeColumn,
    changeColumnName,
    setMark
}