import { Cinema } from '../../entities/cinemas/Cinema';
import { CinemaEntity, CinemaEntityFromMockImp } from '../../entities/cinemas/CinemaEntity';
import {
    HttpResponse,
    HttpResponseSuccess
} from '../../HttpResponse/HttpResponse';

interface CinemasPresentor {
    cinemaEntity: CinemaEntity;
    getCinemas(): Promise<HttpResponse<Cinema[]>>;
    getCinemaById(id: String):  Promise<HttpResponse<Cinema>>;

}

class CinemasPresentorImp implements CinemasPresentor { 
    private static instance: CinemasPresentor;
    cinemaEntity: CinemaEntity;

    private constructor(cinemaEntity: CinemaEntity) {
        this.cinemaEntity = cinemaEntity;
    }

    public static getInstance(): CinemasPresentor {
        if (!CinemasPresentorImp.instance) {
            CinemasPresentorImp.instance = new CinemasPresentorImp(new CinemaEntityFromMockImp());
        }

        return CinemasPresentorImp.instance;
    }

    async getCinemas(): Promise<HttpResponse<Cinema[]>> {

        const cinemas: Cinema[] = await this.cinemaEntity.getCinemas();
        const response = new HttpResponseSuccess<Cinema[]>(cinemas);
        return response;
    }


    async getCinemaById(id: String):  Promise<HttpResponse<Cinema>> {
        const cinema: Cinema = await this.cinemaEntity.getCinemaById(id)
        const response = new HttpResponseSuccess<Cinema>(cinema);
        return response;
    }
}

const cinemasPresentor: CinemasPresentor = CinemasPresentorImp.getInstance();

export {
    CinemasPresentor,
    cinemasPresentor
}