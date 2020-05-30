import { User } from '../../entities/users/User';
import { UserEntity, UserEntityFromMockImp } from '../../entities/users/UserEntity';
import {
    HttpResponse,
    HttpResponseSuccess
} from '../../HttpResponse/HttpResponse';

interface UsersCreator {
    userEntity: UserEntity;
    createUser(user: any): Promise<HttpResponse<string>>;
    updateUser(id: String, user: any): Promise<HttpResponse<string>>;
    deleteUser(id: String): Promise<HttpResponse<string>>;

}

class UsersCreatorImp {
    private static instance: UsersCreator;
    userEntity: UserEntity;

    private constructor(userEntity: UserEntity) {
        this.userEntity = userEntity;
    }

    public static getInstance(): UsersCreator {
        if (!UsersCreatorImp.instance) {
            UsersCreatorImp.instance = new UsersCreatorImp(new UserEntityFromMockImp());
        }

        return UsersCreatorImp.instance;
    }

    public async createUser(user: any): Promise<HttpResponse<string>> {
        await this.userEntity.createUser(user);
        const response = new HttpResponseSuccess<string>("created successful!");
        return response;
    }

    public async updateUser(id: String, user: any): Promise<HttpResponse<string>> {
        await this.userEntity.updateByid(id, user);
        const response = new HttpResponseSuccess<string>(`updated at id:${id} successful!`);
        return response;
    }

    public async deleteUser(id: String): Promise<HttpResponse<string>> {
        await this.userEntity.deleteByid(id);
        const response = new HttpResponseSuccess<string>(`deleted at id:${id} successful!`);
        return response;
    }
}

const usersCreator: UsersCreator = UsersCreatorImp.getInstance();

export {
    UsersCreator,
    usersCreator
}