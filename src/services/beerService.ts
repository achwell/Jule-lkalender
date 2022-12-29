import {HttpClient} from "../../helpers/axiosWrapper";
import Beer from "../../types/Beer";
import BeerWithCalendar from "../../types/BeerWithCalendar";
import {userService} from "./userService";
import {calendarService} from "./calendarService";

export const beerService = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete,
    getAllWithCalendar: getAllWithCalendar,
    getAvalilableBeers: getAvalilableBeers,
    getUserBeers: getUserBeers,
};

const baseUrl = "/api/beer";

const httpClient = new HttpClient()

const unique = (value: any, index: any, self: any[]) => {
    return self.indexOf(value) === index
}

function getAll(): Promise<Beer[]> {
    return httpClient.get<Beer[]>({url: baseUrl});
}
async function getAvalilableBeers(calendarId: string): Promise<{ key: string; value: string }[]> {
    const taken = (await calendarService.getAllWithBeer(calendarId)).map(value => value.beerId).filter(unique)
    return (await getAll())
        .filter(value => !taken.includes(value.id))
        .sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
        .map(value => ({key: value.id, value: value.name}))
}
async function getUserBeers (userId: string): Promise<BeerWithCalendar[]> {
    const beerWithCalendars = await getAllWithCalendar();
    beerWithCalendars.sort((a, b) => {
        return (a.calendarName || "").localeCompare(b.calendarName || "") || (a.day || 0) - (b.day ||0);
    })
    return beerWithCalendars.filter(value => value.brewerId === userId)
}

async function getAllWithCalendar(): Promise<BeerWithCalendar[]> {
    const retVal: BeerWithCalendar[] = []
    const beers = await getAll()
    for (const beer of beers) {
        const user = await userService.getById(beer.userId)
        const beerWithCalendar:BeerWithCalendar = {
            ...beer,
            brewer: user.name,
            brewerId: user.id,
            calendarId: 0,
            archived: false,
            calendarName: "",
            day: 0,
            isPublic: false,
            year: 0
        }
        const beerCalendars = beer.beerCalendars

        if (!beerCalendars ||beerCalendars.length < 1) {
            retVal.push(beerWithCalendar)
        } else {
            for (const beerCalendar of beerCalendars) {
                const calendar = await calendarService.getById(beerCalendar.calendarId)
                retVal.push({
                    ...beerWithCalendar,
                    calendarName: calendar.name,
                    calendarId: calendar.id,
                    year: calendar.year,
                    day: beerCalendar.day,
                    archived: calendar.archived,
                    isPublic: calendar.isPublic
                })
            }
        }
    }
    return retVal
}

function getByUserId(id: string): Promise<Beer[]> {
    const url = `${baseUrl}/user${id}`;
    return httpClient.get<Beer[]>({url});
}

function getById(id: string): Promise<Beer> {
    const url = `${baseUrl}/${id}`;
    return httpClient.get<Beer>({url});
}

function create(beer: Beer): Promise<Beer> {
    let payload: Partial<Beer> = beer;
    if (!beer.beerCalendars || beer.beerCalendars.length == 0) {
        payload.beerCalendars = undefined
    }
    return httpClient.post<Partial<Beer>>({url: baseUrl, payload});
}

function update(id: string, beer: Beer): Promise<Beer> {
    let payload: Partial<Beer> = beer;
    if (!beer.beerCalendars || beer.beerCalendars.length == 0) {
        payload.beerCalendars = undefined
    }
    return httpClient.put<Partial<Beer>>({url: `${baseUrl}/${id}`, payload});
}

function _delete(id: string): Promise<Beer> {
    return httpClient.delete<Beer>({url: `${baseUrl}/${id}`});
}
