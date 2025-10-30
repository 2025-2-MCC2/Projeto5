import { Router } from 'express'
import { pool } from './db.js'

const r = Router()

import { controllerUserSearch, controllerUserLogin, controllerUserRegister, controllerUserSearchId, controllerUserDelete, controllerUserUpdate } from './Controllers/userController.js'
import { controllerSearchGroups, controllerGroupSearch, controllerCreateGroup, controllerDeleteGroup, controllerUpdateGroup } from './Controllers/groupController.js'

import { authMiddleware } from './Middlewares/authMiddleware.js'


/**************************Teste de conexão com o banco******************************/
r.get('/db/health', async (_, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS db_ok')
        res.json({ ok: true, db: rows[0].db_ok })
    } catch (err) {
        console.log(err);

        res.status(500).json({ ok: false, db: 'down' })
    }
})

/****************************Usuários**********************************/
//listar usuarios
r.get('/users', async (_, res) => {
    const data = await controllerUserSearch()

    res.status(data.status_code).json(data)
})

//logar usuario
r.post('/loginUser', async (req, res) => {
    const data = await controllerUserLogin(req.body)

    res.status(data.status_code).json(data)
})

//buscar usuario
r.get('/user/:id', authMiddleware, async (req, res) => {
    const data = await controllerUserSearchId(req.params.id)

    res.status(data.status_code).json(data)
})

//cadastrar usuario
r.post('/registerUser', async (req, res) => {
    const data = await controllerUserRegister(req.body)

    res.status(data.status_code).json(data)
})

//deletar usuario
r.delete('/deleteUser/:id', authMiddleware, async (req, res) => {
    const { id } = req.params

    if (parseInt(id, 10) !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode deletar a sua própria conta' })
    }

    const data = await controllerUserDelete(req.params.id)

    res.status(data.status_code).json(data)
})

//atualizar usuario
r.put('/updateUser/:id', authMiddleware, async (req, res) => {
    const { id } = req.params

    if (parseInt(id, 10) !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode editar a sua própria conta' })
    }
    const data = {nome: req.body.nome, tipo_usuario: req.body.tipo_usuario, id: id}
    
    const response = await controllerUserUpdate(data)

    res.status(response.status_code).json(response)
})
/******************************************************************** */

/*******************************Grupos*********************************** */
//Listar Grupos
r.get('/grupos', async (_, res) => {
    const data = await controllerSearchGroups()

    res.status(data.status_code).json(data)
})

//selecionar grupo
r.get('/grupos/:id', async (req, res) => {
    const data = await controllerGroupSearch(req.params.id)

    res.status(data.status_code).json(data)
})

//criar grupo
r.post('/criarGrupo', async (req, res) => {
    const data = await controllerCreateGroup(req.body)

    res.status(data.status_code).json(data)
})

//deletar grupo
r.delete('/deletarGrupo/:id', authMiddleware, async (req, res) => {
    const data = await controllerDeleteGroup(req.params.id)

    res.status(data.status_code).json(data)
})

//atualizar grupo
r.put('/atualizarGrupo/:id', async (req, res) => {
    const data = {nome_grupo: req.body.nome_grupo, data_criacao: req.body.data_criacao, id: req.params.id}
    
    const response = await controllerUpdateGroup(data)

    res.status(response.status_code).json(response)
})

export default r
