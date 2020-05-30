import { Cinema, CinemaImp } from './Cinema';
import { cinemaMocks } from '../../services/mocks/cinemaMocks';

interface CinemaEntity {
    
    createCinema(cinema: any): Cinema[];
    getCinemas(): Cinema[];
    getCinemaById(id: String): Cinema;
    updateByid(id: String, cinema: any): Cinema[];
    deleteByid(id: String): Cinema[];

    

    autoGenerateIdFromMock(): Number;
    filterCinemasById(id: String, cinema: Cinema[]): Cinema;
    mappingFromDataSourceToCinemas(cinemas: any[]): Cinema[];
    mappingFromHttpBodytoCinema(cinema: any): Cinema;
    updateUserMockAttribute(cinema: Cinema, cinemaUpdated: Cinema): Cinema;

}

abstract class CinemaEntityUtility implements CinemaEntity {
    abstract createCinema(cinema: any): Cinema[];
    abstract getCinemas(): Cinema[];
    abstract getCinemaById(id: String): Cinema;
    abstract updateByid(id: String, cinema: any): Cinema[];
    abstract deleteByid(id: String): Cinema[];

    public autoGenerateIdFromMock(): Number {
        const id: Number = (cinemaMocks.length - 1) + 1;

        return id;
    }

    public filterCinemasById(id: String, cinemas: Cinema[]): Cinema {
        const handleFilterCinemaById = (cinema) => Number(cinema.id) === Number(id);
        const cinema: Cinema = cinemas.filter(handleFilterCinemaById)[0];
        return cinema;
    }

    mappingFromDataSourceToCinemas(cinemas: any[]): Cinema[] {
        const filteredCinemas = cinemas.filter((cinema) => cinema !== null);

        const mappedCinemas: Cinema[] = filteredCinemas.map((cinema) => {
            return new CinemaImp(cinema);
        });

        return mappedCinemas;
    }

    mappingFromHttpBodytoCinema(cinema: any): Cinema {
        const mappedCinema: Cinema = new CinemaImp(cinema);
        return mappedCinema;
    }

    updateUserMockAttribute(cinema: Cinema, cinemaUpdated: Cinema): Cinema {
        cinema.name = cinemaUpdated.name ? cinemaUpdated.name : cinema.name;
        cinema.address = cinemaUpdated.address ? cinemaUpdated.address: cinema.address;

        return cinema;
    }

}

class CinemaEntityFromMockImp extends CinemaEntityUtility implements CinemaEntity {
    constructor() {
        super()
     }


    createCinema(cinema: any): Cinema[] {
        cinema.id = this.autoGenerateIdFromMock();
        const cinemaMapped: Cinema = this.mappingFromHttpBodytoCinema(cinema);
        cinemaMocks.push(cinemaMapped);

        const cinemas: Cinema[] = this.getCinemas();

        return cinemas;
    }

    getCinemas(): Cinema[] {
        const cinemas: Cinema[] =  this.mappingFromDataSourceToCinemas(cinemaMocks);
        return cinemas;
    }

    getCinemaById(id: String): Cinema {
        const cinemas: Cinema[] =  this.mappingFromDataSourceToCinemas(cinemaMocks);
        const cinema: Cinema = this.filterCinemasById(id, cinemas);

        return cinema;
    }

    updateByid(id: String, cinema: any): Cinema[] {
        const cinemaMapped: Cinema = this.mappingFromHttpBodytoCinema(cinema);
        const cinemas: Cinema[] =  this.mappingFromDataSourceToCinemas(cinemaMocks);

        let cinemasUpdated: Cinema[] = cinemas.map((cinema) => {
            if (Number(cinema.id) === Number(id)) {
                const indexId = Number(id);
                let cinemaUpdated:Cinema = this.updateUserMockAttribute(cinemas[indexId], cinemaMapped);
                cinemaMocks[indexId] = cinemaUpdated;
                return cinemaUpdated;
            } else {
                return cinema;
            }
        })

        return cinemasUpdated;
    }

    deleteByid(id: String): Cinema[] {
        const cinemas: Cinema[] =  this.mappingFromDataSourceToCinemas(cinemaMocks);

        let cinemaUpdated: Cinema[] = cinemas.map((cinema) => {
            if (Number(cinema.id) === Number(id)) {
                const indexId = Number(id);
                cinemaMocks[indexId] = null;
                cinema = null;
                return cinema;
            } else {
                return cinema;
            }
        });

        return cinemaUpdated;
    }
}

export {
    CinemaEntity,
    CinemaEntityFromMockImp
}