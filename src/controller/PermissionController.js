const PermissionService = require('../services/PermissionService')
const permissionService = new PermissionService();
class PermissionController{
    static async create(request, response){
        const{name, description} = request.body;
        try {
            const permission = await permissionService.create({name, description});
            return response.status(201).json(permission);
        } catch (error) {
            console.log(error);
            return response.status(400).json({message: error.message});
        }
        
    }
}

module.exports = PermissionController;