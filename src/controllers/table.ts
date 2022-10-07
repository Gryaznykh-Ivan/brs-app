import { Prisma } from '@prisma/client'
import { Context } from 'koa'
import validator from 'validator'
import prisma from '../db'
import { BadRequest, Ok } from '../utils/response'

const getTables = async (ctx: Context) => {

}

const getTableById = async (ctx: Context) => {

}

const createTable = async (ctx: Context) => {

}

const removeTable = async (ctx: Context) => {

}

const addColumn = async (ctx: Context) => {

}

const removeColumn = async (ctx: Context) => {

}

const changeColumnName = async (ctx: Context) => {

}

const setMark = async (ctx: Context) => {

}

export = {
    getTables,
    getTableById,
    createTable,
    removeTable,
    addColumn,
    removeColumn,
    changeColumnName,
    setMark
}