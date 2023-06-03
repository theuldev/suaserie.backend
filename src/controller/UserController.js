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
            await body('lastname').isAlpha().withMessage('Campo último nome deve conter apenas letras!').run(request);
            
            const errorResponse = errorsValidator(request);

            if(errorResponse){
                return response.status(400).json(errorResponse);
            }
            const userDTO = new UserDTO(request.body)

            const user = await userService.create(userDTO)

            return response.status(201).json({user});
            
        }catch(error){
            console.error(error);
            return response.status(400).json(error.message);
        }
        
    }

    static async updateUser(request, response) {
        try {
            const { id } = request.params;
            const { name, lastname, nickname, email} = request.body;

            await body('email').optional().isEmail().normalizeEmail().withMessage("Email inválido!").run(request);
            await body('name').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo nome deve conter apenas letras!').run(request);
            await body('lastname').optional({checkFalsy: true }).matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s ]+$/).withMessage('Campo último nome deve conter apenas letras!').run(request);
            await body('nickname').optional().isAlphanumeric().isLength({ min: 5 }, {max:12 }).withMessage('Campo nickname deve conter apenas letras e números, seu tamanho deve está compreendido entre 5 e 12 caracteres!').run(request);
             
        
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


