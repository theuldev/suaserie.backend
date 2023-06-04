const serie = require('../models/serie');
const SerieService = require('../services/SerieService');
const serieService = new SerieService();
class SerieController{
    static async create(request, response){
        const{name, seasons, episodes, rottenTomatoes, summary, img,cast} = request.body
        try {
            const serie = await serieService.create({name, seasons, episodes, rottenTomatoes, summary, img, cast})
            return response.status(201).json(serie);
        } catch (error) {
            return response.status(400).json({message: error.message});
        }

    }
}

module.exports = SerieController;