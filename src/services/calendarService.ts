import {axiosWrapper} from "../../helpers/axiosWrapper";
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

function getAll(): Promise<Calendar[]> {
    return axiosWrapper.get(baseUrl)
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
    return axiosWrapper.get(url);
}

function create(calendar: Calendar): Promise<Calendar> {
    const {id, ...data} = calendar
    return axiosWrapper.post(baseUrl, {...data, year: +calendar.year});
}

function update(id: string, calendar: Calendar): Promise<Calendar> {
    return axiosWrapper.put(`${baseUrl}/${id}`, {...calendar, year: +calendar.year});
}

function _delete(id: string): Promise<Calendar> {
    return axiosWrapper.delete(`${baseUrl}/${id}`);
}

async function removeBeer(calendarId: string, beerId: string): Promise<Calendar> {
    const beercalendar: BeerCalendar = await axiosWrapper.get(`${apiBeerCalendar}/${calendarId}|${beerId}`);
    await axiosWrapper.delete(`${apiBeerCalendar}/${beercalendar.id}`)
    return await getById(calendarId)
}

async function addBeer(beerCalendar: BeerCalendar): Promise<BeerCalendar> {
    return await axiosWrapper.post(apiBeerCalendar, beerCalendar)
}
