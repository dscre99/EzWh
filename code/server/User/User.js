class User {
    #id = undefined;
    #name = "";
    #surname = "";
    #email = "";
    #password = "";
    #type = "";

    constructor(name, surname, email, password, type) {
        //this.#id = id;
        this.#name = name;
        this.#surname = surname;
        this.#email = email;
        this.#password = password;
        this.#type = type;
    }

    getId(){
        return this.#id;
    }

    getName(){
        return this.#name;
    }

    getSurname(){
        return this.#surname;
    }

    getEmail(){
        return this.#email;
    }

    getPassword(){
        return this.#password;
    }

    getType(){
        return this.#type;
    }

    getUserAsDict(){
        let dict = {};
        dict['id'] = this.#id;
        dict['name'] = this.#name;
        dict['surname'] = this.#surname;
        dict['password'] = this.#password;
        dict['type'] = this.#type;

        return dict
    }
}

module.exports = User;