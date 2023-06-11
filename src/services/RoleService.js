const database  = require('../models');
const uuid = require('uuid');
class RoleService{
    async create(roleDTO){
        const role = await database.roles.findOne({
            where:{
                name: roleDTO.name
            }
        })

        if(role){
            throw new Error('Esta role já está cadastrada!');
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                name: roleDTO.name,
                description: roleDTO.description
            })

            return newRole;
        } catch (error) {
            throw new Error('Erro ao tentar cadastrar role');
        }

    }


    async getRoles(){
        const roles = await database.roles.findAll();
        if(!roles){
            throw new Error("Não há roles cadastradas!");
        }

        return roles;

    }
}

module.exports= RoleService;