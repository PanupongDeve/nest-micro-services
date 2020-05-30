interface Cinema {
    id: String;
    name: String;
    address: String;

}

class CinemaImp implements Cinema {
    id: String;
    name: String;
    address: String;

    constructor(user: any) {
        const {
            id,
            name,
            address
        } = user;

        this.name = name;
        this.address = address;
        this.id = id;
    }

}


export {
    Cinema,
    CinemaImp
}