import { User } from '../../entities/users/User';
import { UserEntity, UserEntityFromMockImp } from '../../entities/users/UserEntity';
import {
    HttpResponse,
    HttpResponseSuccess
} from '../../HttpResponse/HttpResponse';


interface UsersPresenter {
    userEntity: UserEntity;
    getUsers(): Promise<HttpResponse<User[]>>;
    getUserById(id: String):  Promise<HttpResponse<User>>;

}

class UsersPresenterImp implements UsersPresenter {
    private static instance: UsersPresenter;
    userEntity: UserEntity;

    private constructor(userEntity: UserEntity) {
        this.userEntity = userEntity;
    }

    public static getInstance(): UsersPresenter {
        if (!UsersPresenterImp.instance) {
            UsersPresenterImp.instance = new UsersPresenterImp(new UserEntityFromMockImp());
        }

        return UsersPresenterImp.instance;
    }

    public async getUsers(): Promise<HttpResponse<User[]>> {

        const users: User[] = await this.userEntity.getUsers();
        const response = new HttpResponseSuccess<User[]>(users);
        return response;
    }

    public async getUserById(id: String): Promise<HttpResponse<User>> {
        const user: User = this.userEntity.getUserById(id);
        const response = new HttpResponseSuccess<User>(user);
        return response;
    }
}

const usersPresenter: UsersPresenter = UsersPresenterImp.getInstance();

export {
    UsersPresenter,
    usersPresenter
}