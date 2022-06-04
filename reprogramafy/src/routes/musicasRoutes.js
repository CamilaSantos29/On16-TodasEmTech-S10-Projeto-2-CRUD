//chama o controller de podcasts
const controller = require('../controller/musicasController')

//chamando express
const express = require('express')

// funcao de rotas de express
const router = express.Router()

// router, metodo http (rota, função)
router.get ('/musicas', controller.getAllMusicas)
router.get("/catalogo/:id", controller.getMusicaId)
router.get("/catalogo/artista", controller.getArtista)
router.post("/adicionar", controller.criarMusica)
router.put("/atualizar/:id", controller.atualizarMusica) 
router.patch("/favorita/:id", controller.atualizarMusicaFavorita) 
router.delete("/delete/:id", controller.deletarMusica) 

// exportar para seer usado no app.js
module.exports = router