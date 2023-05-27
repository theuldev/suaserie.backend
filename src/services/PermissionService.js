const database  = require('../models');
const uuid = require('uuid');

class PermissionService{
   async create(permissionDTO){

    const permission  = await database.permissions.findOne({
        where:{
            name: permissionDTO.name
        }
    })

    if(permission){
        throw new Error("Esta permissão já foi cadastrada!");
    }

    try {
        const newPermission = await database.permissions.create({
            id: uuid.v4(),
            name: permissionDTO.name,
            description: permissionDTO.description
        })
        return newPermission;
    } catch (error) {
        throw new Error('Erro ao tentar cadastrar permission');
    }
   }
}

module.exports = PermissionService;