import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query("select * from employee2")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo va mal"
        })
    }
}

export const getEmployee = async (req, res) => {
    const getId = parseInt(req.params.id)
    try {
        const [rows] = await pool.query("select * from employee2 where id = ?", [getId])
        if (rows.length <= 0) return res.status(404).json({
            mensaje: "Empleado no encontrado"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo va mal"
        })
    }
}

export const createEmployee = async (req, res) => {
    const { name, salary } = req.body
    try {
        const [rows] = await pool.query("insert into employee2(name, salary) values (?, ?)", [name, salary])
        res.status(201).send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo va mal"
        })
    }
}

export const updateEmployee = async (req, res) => {
    const getId = parseInt(req.params.id)
    const { name, salary } = req.body

    try {
        const [data] = await pool.query("update employee2 set name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ?", [name, salary, getId])
        if (data.affectedRows <= 0) return res.status(404).json({
            mensaje: "Empleado no encontrado"
        })

        const [row] = await pool.query("select * from employee2 where id = ?", [getId])
        res.json(row[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo va mal"
        })
    }
}


export const deleteEmployee = async (req, res) => {
    const getId = parseInt(req.params.id)
    try {
        const [data] = await pool.query("delete from employee2 where id = ?", [getId])
        if (data.affectedRows <= 0) return res.status(404).json({
            mensaje: "Empleado no encontrado"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo va mal"
        })
    }
}
