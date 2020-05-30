import { CinemaEntity, CinemaEntityFromMockImp } from '../../entities/cinemas/CinemaEntity';
import {
    HttpResponse,
    HttpResponseSuccess
} from '../../HttpResponse/HttpResponse';

interface CinemasCreator {
    cinemaEntity: CinemaEntity;
    createCinema(cinema: any): Promise<HttpResponse<string>>;
    updateCinema(id: String, cinema: any): Promise<HttpResponse<string>>;
    deleteCinema(id: String): Promise<HttpResponse<string>>;

}

class CinemasCreatorImp {
    private static instance: CinemasCreator;
    cinemaEntity: CinemaEntity;

    private constructor(cinemaEntity: CinemaEntity) {
        this.cinemaEntity = cinemaEntity;
    }

    public static getInstance(): CinemasCreator {
        if (!CinemasCreatorImp.instance) {
            CinemasCreatorImp.instance = new CinemasCreatorImp(new CinemaEntityFromMockImp());
        }

        return CinemasCreatorImp.instance;
    }


    async createCinema(cinema: any): Promise<HttpResponse<string>> {
        await this.cinemaEntity.createCinema(cinema);
        const response = new HttpResponseSuccess<string>("created successful!");
        return response;
    }


    async updateCinema(id: String, cinema: any): Promise<HttpResponse<string>> {
        await this.cinemaEntity.updateByid(id, cinema);
        const response = new HttpResponseSuccess<string>(`updated at id:${id} successful!`);
        return response;
    }

    async deleteCinema(id: String): Promise<HttpResponse<string>> {
        await this.cinemaEntity.deleteByid(id);
        const response = new HttpResponseSuccess<string>(`deleted at id:${id} successful!`);
        return response;
    }
}

const cinemasCreator: CinemasCreator = CinemasCreatorImp.getInstance();

export {
    CinemasCreator,
    cinemasCreator
}