class UserResponse{
    constructor({id ,name, lastname, email, nickname,photo,acessToken}){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.nickname = nickname; 
        this.photo = photo;
        this.acessToken = acessToken;
    }
}

module.exports = UserResponse;