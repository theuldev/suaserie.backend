const serie = require('../models/serie');
const SerieService = require('../services/SerieService');
const serieService = new SerieService();
class SerieController{
    static async create(request, response){
        const{name, seasons, episodes, rottenTomatoes, summary, img,cast,releaseYear, url} = request.body
        try {
            const serie = await serieService.create({name, seasons, episodes, rottenTomatoes, summary, img, cast, releaseYear,url})
            return response.status(201).json(serie);
        } catch (error) {
            return response.status(400).json({message: error.message});
        }

    }

    static async update(request, response){
        const {id} = request.params
        const{name, seasons, episodes, rottenTomatoes, summary, img,cast} = request.body

        try {
            const updateFields = {};
            const fields = {name, seasons, episodes, rottenTomatoes, summary, img,cast}
            
            for (const key in fields) {
                if (fields[key]) {
                    updateFields[key] = fields[key];
                }
            }
    
            const updatedSerie = await serieService.update(id, updateFields)

            return response.status(200).json(updatedSerie);
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async getAll(request, response){
        try {
            return response.status(200).json(await serieService.getAll());
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async getById(request, response){
        const {id} = request.params
        try {
            return response.status(200).json(await serieService.getById(id))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async deleteById(request, response){
        const {id} = request.params
        try {
            return response.status(200).json(await serieService.deleteById(id))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }
}

module.exports = SerieController;