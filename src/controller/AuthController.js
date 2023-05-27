const AuthService = require('../services/AuthService')
const authService = new AuthService();

class AuthController{
    static async login(request, response){
        const {email, password} = request.body;

        try {
            const login = await authService.login({email, password});
    
            response.status(200).json(login);
        } catch (error) {
            return response.status(401).json({message: error.message});
        }
    }
}

module.exports = AuthController;