const database = require('../models')
const { where } = require('sequelize')
const {hash} = require('bcryptjs');
const UUID = require('uuid');
class UserService{
    async create(userDTO){
        try {
            const user = await database.user.findOne({
                where: {
                    email: userDTO.email
                }});
            
            if(user){
                throw new Error("Email já cadastrado no sistema!");    
            }

            const role  = await getRole(); 
            
            const passwordHash = await hash(userDTO.password, 8);
            const newUser  = await database.user.create({
                id: UUID.v4(),
                name: userDTO.name,
                nickname: userDTO.nickname,
                lastname: userDTO.lastname,
                email: userDTO.email,
                password: passwordHash,
                roleId: role.id
            })
        
            return newUser;
            
            
        } catch (error) {
            throw new Error("Erro ao tentar cadastrar usuário. " + error.message);

        }
    }

    async getAll(){
        try {
            const users = await database.user.findAll();
            
            if(!users){
                throw new Error("Não há usuários cadastrados!");
            }

            return users;

        } catch (error) {
            throw new Error("Erro ao buscar usuários: " + error.message);
        }


    }

    async getById(id){

        const user = await database.user.findByPk(id);
        
        if(!user){
            throw new Error(`Usuário com id ${id} não encontrado!`);
        }
        
        return user;     
    }

    async deleteById(id){
        const user = await this.getById(id);
        try {
            await user.destroy();
        } catch (error) {
            throw new Error("Erro ao tentar deletar usuário: ");
        }
        return user;
    }

    async update(id, updateFields){ 
        const user = await this.getById(id);
        try {            

            Object.assign(user, updateFields)
            const updatedUser = await user.save();

            return updatedUser;
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao tentar atualizar o usuário!");
        }
    }
    
    
    async addFavoriteSerie(dto){
        try {
          const serie = await database.serie.findOne({
              where:{
                  id: dto.idSerie
              }
          })  
          
          if(!serie){
            throw new Error("Série não encontrada no banco de dados!");
          }
          
          await database.user_serie_favorites.create({
            userId: dto.userId,
            serieId: dto.idSerie
          })
          const favorites = await database.user.findByPk(dto.userId, {
             include:{
                 association: 'favoritesList',
                 through: { 
                     attributes: [],
                   },
             } 
           });
 
 
           return favorites
         
        } catch (error) {
             console.log(error)
             throw new Error("Erro ao tentar adicionar série na lista: "+error)
        }
 
        
     }


}

async function getRole(){
    let role = await database.roles.findOne({
        where:{
            name: 'user'
        }
    })

    if(!role){
        role = await database.roles.create({
            id: UUID.v4(),
            name: 'user',
            description: 'perfil de usuário'
        })
    }
    return role;
}

module.exports = UserService;