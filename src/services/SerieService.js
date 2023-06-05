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

    async getAll(){
        try {
            return await database.serie.findAll();
        } catch (error) {
            throw new Error("Não foi possível retornar as séries");
        }
    }

    async getById(id){
        try {
            const serie = await database.serie.findByPk(id)
            if(!serie){
                throw new Error("Série não encontrada no banco de dados!");
            }
            return serie;
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao tentar buscar série!" + error)
        }
    }

    async update(id, updateFields){
        
        try {
            const serie = await database.serie.findByPk(id)

            if(!serie){
                throw new Error("Série não encontrada no banco de dados!");
            }
            
            Object.assign(serie, updateFields)
            const updatedSerie = await serie.save();

            return updatedSerie;
        } catch (error) {
            throw new Error("Erro ao tentar atualizar série!: " + error)
        }
    }

    async deleteById(id){
        try {
            const serie = await database.serie.findByPk(id)

            if(!serie){
                throw new Error("Série não encontrada no banco de dados!");
            }

            await serie.destroy();

        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    

    async getSeriesFavorites(dto){
       try {
         const serie = await database.serie.findOne({
             where:{
                 id: dto.idSerie
             }
         })  
         
         const user = await database.user.findByPk(dto.userId);
         await user.addFavoritesList(serie);
         const favorites = await database.user.findByPk(dto.userId, {
            include:{
                association: 'favoritesList',
                through: { 
                    attributes: [],
                  },
            } 
          });


          return favorites.favoritesList;

        
       } catch (error) {
            console.log(error)
            throw new Error("Erro ao cadastrar ao usuario")
       }

       
    }
    
}

module.exports = SerieService;