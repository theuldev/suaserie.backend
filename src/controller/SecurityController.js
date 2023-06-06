const SecurityService = require('../services/SecurityService');
const securityService = new SecurityService();
class SecurityController{
    static async createACL(request, response){
        const{roles} = request.body;
        const{userId} = request

        try {
            const acl = await securityService.createACL({roles, userId})
            return response.status(201).json(acl)
        } catch (error) {
            return response.status(400).json({message: error.message})
        }
    }
}

module.exports = SecurityController;