const UserDTO = require('../dto/UserDTO')
const { where } = require('sequelize')
const{body, validationResult} = require('express-validator');
const UserService = require('../services/UserService');

const userService = new UserService();

class UserController {
    static async createUser(request, response){
        try{
            
            await body('email').isEmail().normalizeEmail().withMessage("Email inválido!").run(request);
            await body('password').isLength({ min: 8 }).withMessage("Campo senha deve ter no mínimo 8 caracteres!").run(request);
            await body('name').isAlpha().withMessage('Campo nome deve conter apenas letras!').run(request);
            //await body('lastname').isAlpha().withMessage('Campo último nome deve conter apenas letras!').run(request);
            
            const errorResponse = errorsValidator(request);

            if(errorResponse){
                return response.status(400).json(errorResponse);
            }
            const {name, lastname, nickname, email, password, photo, confirmPassword} = request.body
            const user = await userService.create({name, lastname, nickname, email, password, photo,confirmPassword})

            return response.status(201).json({user});
            
        }catch(error){
            console.error(error);
            return response.status(400).json(error.message);
        }
        
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------
    // metodos para o adm gerenciar os usuarios
    static async updateUser(request, response) {
        try {
            const { id } = request.params;
            const { name, lastname, nickname, email} = request.body;

            await body('email').optional().isEmail().normalizeEmail().withMessage("Email inválido!").run(request);
            await body('name').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo nome deve conter apenas letras!').run(request);
            await body('lastname').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo último nome deve conter apenas letras!').run(request);
            //await body('nickname').optional().isAlphanumeric().isLength({ min: 5 }, {max:12 }).withMessage('Campo nickname deve conter apenas letras e números, seu tamanho deve está compreendido entre 5 e 12 caracteres!').run(request);
             
        
            const errorResponse = errorsValidator(request);

            if(errorResponse){
                return response.status(400).json(errorResponse);
            }  
            const updateFields = {};

            const fields = { name, lastname, nickname, email };
    
            for (const key in fields) {
                if (fields[key]) {
                    updateFields[key] = fields[key];
                }
            }
            const user = await userService.update(id, updateFields)

            return response.status(200).json(user);            
    
        } catch (error) {
            console.error(error)
            return response.status(404).json(error.message);
        }
    }

    static async getUsers(request, response){
        try{
            const users = await userService.getAll();
            return response.status(200).json(users);

        }catch(error){
            console.error(error)
            return response.status(400).json(error.message);
        }
    }

    static async getUserById(request, response){
        try{
            const {id} = request.params
            
            const user = await userService.getById(id);

            return response.status(200).json(user);

        }catch(error){
            console.error(error)
            response.status(404).json(error.message);
        }
    }

    static async deleteById(request, response){
        try{
            const {id} = request.params
        
            await userService.deleteById(id);

            return response.sendStatus(204);
        }catch(error){
            console.error(error)
            response.status(404).json({message: error.message});
        }
    }
 //---------------------------------------------------------------
// Endpoints públicos ao usuario. 
    static async infoUser(request, response){
        const{userId} = request;
        try{
            const user = await userService.getById(userId);

            return response.status(200).json(user);

        }catch(error){
            console.error(error)
            response.status(404).json(error.message);
        }
    }

    static async updateMe(request, response){
        const{userId} = request;
        const { name, lastname, nickname, email, photo} = request.body;
        try {
            await body('email').optional().isEmail().normalizeEmail().withMessage("Email inválido!").run(request);
            await body('name').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo nome deve conter apenas letras!').run(request);
            await body('lastname').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo último nome deve conter apenas letras!').run(request);
            //await body('nickname').optional().isAlphanumeric().isLength({ min: 5 }, {max:12 }).withMessage('Campo nickname deve conter apenas letras e números, seu tamanho deve está compreendido entre 5 e 12 caracteres!').run(request);
             
        
            const errorResponse = errorsValidator(request);

            if(errorResponse){
                return response.status(400).json(errorResponse);
            } 
            const updateFields = {};

            const fields = { name, lastname, nickname, email, photo};
    
            for (const key in fields) {
                if (fields[key]) {
                    updateFields[key] = fields[key];
                }
            }
            const user = await userService.update(userId, updateFields)

            return response.status(200).json(user);            
    
        } catch (error) {
            console.error(error)
            return response.status(404).json(error.message);
        }
    }

    static async changePassword(request, response){
        const{userId} = request;
        const {oldPassword, newPassword} = request.body;

        try {
            await userService.changePassword({userId, oldPassword, newPassword})
            return response.sendStatus(200);
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async deleteMe(request,response){
        const{userId} = request;
        try{
            await userService.deleteById(userId);

            return response.sendStatus(204);
        }catch(error){
            console.error(error)
            response.status(404).json({message: error.message});
        }
    }

    static async addFavoriteSerie(request,response){
        const{idSerie} = request.body;
        const{userId} = request;
        
        try{
            const favorites = await userService.addFavoriteSerie({idSerie, userId});
            return response.status(201).json(favorites);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async removeFavoriteSerie(request, response){
        const{id} = request.params;
        const{userId} = request;
        try{
            await userService.removeFavoriteSerie({id, userId});
            return response.sendStatus(204);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async getFavoriteSeries(request, response){
        const{userId} = request;

        try {
            return response.status(200).json(await userService.getFavoriteSeries(userId))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async addWatchedSerie(request, response){
        const{id} = request.params
        const{userId} = request;

        try{
            const watchedSeries = await userService.addWatchedSerie({id, userId});
            return response.status(201).json(watchedSeries)
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }


    static async removeWatchedSerie(request, response){
        const{id} = request.params;
        const{userId} = request;
        try{
            await userService.removeWatchedSerie({id, userId});
            return response.sendStatus(204);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async getWatchedSeries(request, response){
        const{userId} = request;

        try {
            return response.status(200).json(await userService.getWatchedSeries(userId))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async addDislikedSerie(request, response){
        const{id} = request.params
        const{userId} = request;

        try{
            const dislikedSeries = await userService.addDislikedSerie({id, userId});
            return response.status(201).json(dislikedSeries)
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async removeDislikedSerie(request, response){
        const{id} = request.params;
        const{userId} = request;
        try{
            await userService.removeDislikedSerie({id, userId});
            return response.sendStatus(204);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async getDislikedSeries(request, response){
        const{userId} = request;

        try {
            return response.status(200).json(await userService.getDislikedSeries(userId))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }


    static async addDesiredSerie(request, response){
        const{id} = request.params
        const{userId} = request;

        try{
            const desiredSeries = await userService.addDesiredSerie({id, userId});
            return response.status(201).json(desiredSeries)
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }


    static async removeDesiredSerie(request, response){
        const{id} = request.params;
        const{userId} = request;
        try{
            await userService.removeDesiredSerie({id, userId});
            return response.sendStatus(204);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    static async getDesiredSeries(request, response){
        const{userId} = request;

        try {
            return response.status(200).json(await userService.getDesiredSeries(userId))
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }

    static async makeRating(request, response){
        const {userId} = request
        const{serieId, rating} = request.body
        try {
            const makeRating = await userService.makeRating({userId, serieId, rating});
            return response.status(200).json(makeRating)
        } catch (error) {
            console.log(error)
            return response.status(400).json({message: error.message})
        }
    }

    static async getRating(request, response){
        const {userId} = request
        const{serieId} = request.params
        try {
            const rating = await userService.getRating({userId, serieId});
            return response.status(200).json(rating)
        } catch (error) {
            console.log(error)
            return response.status(400).json({message: error.message})
        }
    }

    static async createStreaming(request, response){
        const{name,img} = request.body
        try {
            const newStreaming = await userService.createStreaming({name, img})
        } catch (error) {
            
        }
    }
    
}

function errorsValidator(request) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const errorsResponse = errors.array().map(error => ({
            field: error.path,
            message: error.msg
          }));

        return { errors: errorsResponse };
    }

    return undefined;
}


module.exports = UserController;


