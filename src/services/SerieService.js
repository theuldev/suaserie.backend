const database = require('../models');
const UUID = require('uuid');
class SerieService{
    async create(serieDTO){
        try {
            const serie = await database.serie.findOne({
                where: {
                    name: serieDTO.name
                }
            })
    
            if(serie){
                throw new Error("Série já cadastrada no banco de dados!")
            }    
    
            const newSerie = await database.serie.create({
                id: UUID.v4(),
                name: serieDTO.name,
                seasons: serieDTO.seasons,
                episodes: serieDTO.episodes,
                rottenTomatoes: serieDTO.rottenTomatoes,
                summary: serieDTO.summary,
                img: serieDTO.img,
                cast: serieDTO.cast
            })
    
            return newSerie;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao cadastrar série")
        }
    }
}

module.exports = SerieService;