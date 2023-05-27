const database = require('../models')
const Sequelize = require('sequelize')
class SecurityService{
    async createACL(aclDTO){
        const user = await database.user.findOne({
            //include para retornar as informações de perfis e roles do user
            include: [{
                model: database.roles,
                as: 'user_role',
                attributes: ['id', 'name', 'description'] //atributos das roles 
            },{
                model: database.permissions,
                as: 'user_permission',
                attributes:['id', 'name', 'description']
            }],
            where:{
                id: aclDTO.userId
            }
        })
       if(!user){
            throw new Error('Este usuário não está cadastrado!')
       } 

       //buscar todas as roles baseadas nos id's que foram passados, verificar se existe...
       const roles = await database.roles.findAll({
            where:{
                id: {
                    // Operação do sequelize, onde passamos um array e ele verifica cada posição do array e fazer a busca no bd.
                    [Sequelize.Op.in]: aclDTO.roles 
                }
            }
       })

       const permissions = await database.permissions.findAll({
        where:{
            id: {
                [Sequelize.Op.in]: aclDTO.permissions
            }
        }
      })

      // removendo todos as roles e permissions
      await user.removeUser_role(user.user_role); 
      await user.removeUser_permission(user.user_permission);

      // adicionando novas roles e permissões
      await user.addUser_role(roles)
      await user.addUser_permission(permissions)

      // buscando o user atualizado para retornar. 
      const newUser = await database.user.findOne({
        include: [{
            model: database.roles,
            as: 'user_role',
            attributes: ['id', 'name', 'description']
        },{
            model: database.permissions,
            as: 'user_permission',
            attributes: ['id', 'name', 'description']
        }],
        where:{
            id: aclDTO.userId
        }
      })

      return newUser;


    }
}

module.exports = SecurityService;