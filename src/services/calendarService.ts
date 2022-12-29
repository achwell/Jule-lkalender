import {HttpClient} from "../../helpers/axiosWrapper";
import Calendar from "../../types/Calendar";
import CalendarWithBeer from "../../types/CalendarWithBeer";
import {beerService} from "./beerService";
import BeerCalendar from "../../types/BeerCalendar";

export const calendarService = {
    getAll,
    getAllWithBeer,
    getById,
    create,
    update,
    delete: _delete,
    removeBeer: removeBeer,
    addBeer: addBeer
};

const baseUrl = "/api/calendar";
const apiBeerCalendar = "/api/beercalendar";


const httpClient = new HttpClient()

function getAll(): Promise<Calendar[]> {
    return httpClient.get<Calendar[]>({url: baseUrl});
}

async function getAllWithBeer(calendarId: string): Promise<CalendarWithBeer[]> {
    const retVal: CalendarWithBeer[] = []
    const calendar: Calendar = await getById(calendarId)
    const calendarWithBeer: CalendarWithBeer = {
        ...calendar,
        beerId: "",
        beer: "",
        day: 0
    }
    if (calendar) {
        for (const beerCalendar of calendar.beerCalendars) {
            const beer = await beerService.getById(beerCalendar.beerId)
            retVal.push({
                ...calendarWithBeer,
                beerId: beerCalendar.beerId,
                beer: beer.name,
                day: beerCalendar.day
            })
        }
    }
    retVal.sort((a, b) => a.day - b.day)
    return retVal;
}

function getById(id: string): Promise<Calendar> {
    const url = `${baseUrl}/${id}`;
    return httpClient.get<Calendar>({url});
}

function create(calendar: Calendar): Promise<Calendar> {
    const {id, ...data} = calendar
    const payload: Calendar = {id: "", ...data, year: (+calendar.year)};
    return httpClient.post<Calendar>({url: baseUrl, payload});
}

function update(id: string, calendar: Calendar): Promise<Calendar> {
    const payload: Partial<Calendar> = {...calendar, year: +calendar.year};
    if (!payload.beerCalendars ||payload.beerCalendars.length == 0) {
        payload.beerCalendars = undefined
    }
    const url = `${baseUrl}/${id}`;
    return httpClient.put<Calendar>({url, payload: JSON.parse(JSON.stringify(payload))});
}

function _delete(id: string): Promise<Calendar> {
    const url = `${baseUrl}/${id}`;
    return httpClient.delete<Calendar>({url});
}

async function removeBeer(calendarId: string, beerId: string): Promise<Calendar> {
    const beercalendar: BeerCalendar = await httpClient.get<BeerCalendar>({url: `${apiBeerCalendar}/${calendarId}|${beerId}`});
    return httpClient.delete<Calendar>({url: `${apiBeerCalendar}/${beercalendar.id}`});
    return await getById(calendarId)
}

async function addBeer(beerCalendar: BeerCalendar): Promise<BeerCalendar> {
    return httpClient.post<BeerCalendar>({url: apiBeerCalendar, payload: beerCalendar});
}
