const musicas = require('../models/musicas.json')

// Listar músicas

const getAllMusicas = (request, response) => {

    try {
        response.status(200).json([
            {
                "Músicas": musicas
            }
        ])
    } catch(err) {
        response.status(500).send({message: 'Erro no server.'})
    }
}
// Listar música por artista

const getArtista = (request, response) => {

    let artistaRequisicao = request.query.artists.toLowerCase()

    let artistaFiltro = musicas.filter((music) => {
        artistasLowerCase = music.artists.map((artistasArray) =>
             artistasArray.toLowerCase()
        )
          
             return artistasLowerCase.includes(artistaRequisicao)
         })
             
    if (artistaFiltro.lenght > 0 ) {
        response.status(200).send(artistaFiltro)

    }else {
        response.status(200).send([
            {
                message : "artista não encontrado",
            }
    ])
 }
}

    

const getMusicaId = (request, response) => {

    try {

        let idRequest = request.params.id
        let idFilter = musicas.filter(musicas => musicas.id == idRequest)

        if (idFilter.length > 0) {
            response.status(200).send(idFilter)

        } else {
            response.status(404).send(
                {
                    message: "NOT FOUND."
                }
            )
        }
    } catch (err) {
        response.status(500).send({ message: 'Erro no server.' })
    }
}

const criarMusica = (request, response) => {

    try {
        let titleRequest = request.body.title
        let launchYearRequest = request.body.launchYear
        let favoritedRequest = request.body.favorited
        let artistsRequest = request.body.artists 
    
        let newMusic = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest
        }
    
        musicas.push(newMusic)
    
        response.status(201).json([
            {
                message:'Música adicionada com sucesso!!!!!',
                newMusic
            }
        ])
    } catch(err) {
        console.log(err)
        response.status(500).send([ 
            {
                message:'Erro interno ao cadastrar =('
            }
        ])
    }
}

const atualizarMusica = (request, response) => {
    try {
        const idRequest = request.params.id
        const musicRequest = request.body

        let foundIndex = musicas.findIndex(musicas => musicas.id == idRequest)

        musics.splice(foundIndex, 1, musicRequest)

        response.status(200).json([{
            message: "Música atualizada",
            musicas
        }])
    } catch {
        console.log(err)
        response.status(500).send([{
            message: "Falha ao cadastrar nova música."
        }])
    }
}

const atualizarMusicaFavorita = (response, request) => {
    let idRequest = request.params.id;
    let favoritodRequeste = request.body.favorited;
    favoritoFiltro = musicas.find((musicas) => musicas.id == idRequest)

    if(favoritoFiltro) {
        favoritoFiltro.favorited = favoritodRequeste
        response.status(200).json([{
            message: "Classificação atualizada",
            musicas
        }])
    } else {
        response.status(404).json([{
            message: "Não alterado"
        }])
    }

}
const deletarMusica = (request, response) => {
    try {
        const idRequest = request.params.id
        const musicsIndex = musicas.findIndex(musicas => musicas.id == idRequest)

        musicas.splice(musicsIndex, 1)

        response.status(200).json([{
            message: "Música deletada com sucesso! =)",
            "deletado": idRequest,
            musicas
        }])
    } catch (err) {
        console.log(err)
        response.status(404).send([{
            message: "Erro ao deletar =("
        }])
    }
}

module.exports =  {
    getAllMusicas,
    getArtista,
    getMusicaId,
    criarMusica,
    atualizarMusica,
    atualizarMusicaFavorita,
    deletarMusica
    
}
 