class UserDTO{
    constructor({name, lastname, email, nickname, password}){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
}

module.exports = UserDTO;