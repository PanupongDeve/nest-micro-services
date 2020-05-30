import { User, UserImp } from './User';
import { usersMock } from '../../services/mocks/usersMock';


interface UserEntity {
    
    createUser(user: any): User[];
    getUsers(): User[];
    getUserById(id: String): User;
    updateByid(id: String, user: any): User[];
    deleteByid(id: String): User[];

    

    autoGenerateIdFromMock(): Number;
    filterUsersById(id: String, users: User[]): User;
    mappingFromDataSourceToUsers(users: any[]): User[];
    mappingFromHttpBodytoUser(user: any): User;
    updateUserMockAttribute(user: User, userUpdated: User): User;

}

abstract class UserUtility implements UserEntity {
    abstract createUser(user: any): User[];
    abstract getUsers(): User[];
    abstract getUserById(id: String): User;
    abstract updateByid(id: String, user: any): User[];
    abstract deleteByid(id: String): User[];

    public mappingFromDataSourceToUsers(users: any[]): User[] {
        const filteredUsers = users.filter((user) => user !== null);

        const mappedUsers: User[] = filteredUsers.map((user) => {
            return new UserImp(user);
        });

        return mappedUsers;
    }

    public mappingFromHttpBodytoUser(user: any): User {
        const mappeduser: User = new UserImp(user);
        return mappeduser;
    }

    public autoGenerateIdFromMock(): Number {
        const id: Number = (usersMock.length - 1) + 1;

        return id;
    }
    
    public filterUsersById(id: String, users: User[]): User {
        const handleFilteruserById = (user) => Number(user.id) === Number(id);
        const user: User = users.filter(handleFilteruserById)[0];

        return user;
    }

    public updateUserMockAttribute(user: User, userUpdated: User): User {
        user.firstName = userUpdated.firstName ? userUpdated.firstName : user.firstName;
        user.lastName = userUpdated.lastName ? userUpdated.lastName: user.lastName;

        return user;
    }
}


class UserEntityFromMockImp extends UserUtility implements UserEntity {
    
    constructor() {
        super()
     }


    public getUsers(): User[] {
         
        const users: User[] =  this.mappingFromDataSourceToUsers(usersMock);

        return users;
    }

    public getUserById(id: String): User {
        const users: User[] =  this.mappingFromDataSourceToUsers(usersMock);
        const user: User = this.filterUsersById(id, users);

        return user;
    }

    public createUser(user: any): User[] {
        user.id = this.autoGenerateIdFromMock();
        const userMapped: User = this.mappingFromHttpBodytoUser(user);
        usersMock.push(userMapped);

        const users: User[] = this.getUsers();

        return users;
    }

    public updateByid(id: String, user: any): User[] {
        const userMapped: User = this.mappingFromHttpBodytoUser(user);
        const users: User[] =  this.mappingFromDataSourceToUsers(usersMock);

        let usersUpdated: User[] = users.map((user) => {
            if (Number(user.id) === Number(id)) {
                const indexId = Number(id);
                let userUpdated:User = this.updateUserMockAttribute(users[indexId], userMapped);
                usersMock[indexId] = userUpdated;
                return userUpdated;
            } else {
                return user;
            }
        })

        return usersUpdated;
    }

    public deleteByid(id: String): User[] {
        const users: User[] =  this.mappingFromDataSourceToUsers(usersMock);

        let userUpdated: User[] = users.map((user) => {
            if (Number(user.id) === Number(id)) {
                const indexId = Number(id);
                usersMock[indexId] = null;
                user = null;
                return user;
            } else {
                return user;
            }
        });

        return userUpdated;
    }
}

export {
    UserEntity,
    UserEntityFromMockImp
}