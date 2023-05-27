class UserResponse{
    constructor({id ,name, lastname, email, nickname}){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.nickname = nickname; 
        
    }
}

module.exports = UserResponse;