import {HttpClient} from "../../helpers/axiosWrapper";
import Review from "../../types/Review";

export const reviewService = {
    getByCalendarAndBeerAndUser,
    getByCalendarAndBeer,
    getByCalendar,
    create,
    update
};
const baseUrl = "/api/review";

const httpClient = new HttpClient()

function getByCalendarAndBeerAndUser(calendarId: string, beerId: string, userId: string): Promise<Review[]> {
    const url = `${baseUrl}/${calendarId}|${beerId}|${userId}`;
    return httpClient.get<Review[]>({url});
}

function getByCalendarAndBeer(calendarId: string, beerId: string): Promise<Review[]> {
    const url = `${baseUrl}/${calendarId}|${beerId}`;
    return httpClient.get<Review[]>({url});
}

function getByCalendar(calendarId: string): Promise<Review[]> {
    const url = `${baseUrl}/${calendarId}`;
    return httpClient.get<Review[]>({url});
}

function create(review: Review): Promise<Review> {
    return httpClient.post<Review>({url: baseUrl, payload: review});
}

function update(id: string, review: Review): Promise<Review> {
    return httpClient.put<Review>({url: `${baseUrl}/${id}`, payload: review});
}
