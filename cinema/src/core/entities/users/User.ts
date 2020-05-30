interface User {
    id: String;
    firstName: String;
    lastName: String;

}

class UserImp implements User {
    id: String;
    firstName: String;
    lastName: String;

    constructor(user: any) {
        const {
            id,
            firstName,
            lastName
        } = user;

        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

}


export {
    User,
    UserImp
}