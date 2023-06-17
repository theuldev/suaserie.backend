class UserDTO{
    constructor({name, lastname, email, nickname, password, photo}){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.photo = photo;
    }
}

module.exports = UserDTO;