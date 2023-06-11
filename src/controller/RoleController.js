const RoleService = require('../services/RoleService');
const roleService = new RoleService();
class RoleController{
    static async create(request, response){
        const{name, description} = request.body

        try {
            const role = await roleService.create({name, description});
            return response.status(201).json(role);
        } catch (error) {
            return response.status(400).json({message: error.message});
        }
    }


    static async getRoles(request, response){
        try {
            return response.status(200).json(await roleService.getRoles())
        } catch (error) {
            throw new Error("Não foi possível buscar as roles: " + error)
        }
    }
}

module.exports = RoleController;