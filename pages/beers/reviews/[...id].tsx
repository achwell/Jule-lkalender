import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {Layout} from "../../../src/components/Layout";
import {alertService, beerService, calendarService, reviewService} from "../../../src/services";
import CalendarName from "./CalendarName";
import RatingTable from "./RatingTable";
import Beer from "../../../types/Beer";
import Calendar from "../../../types/Calendar";
import Review from "../../../types/Review";
import {calculateAverage} from "../../../src/utils";
import CommentsTable from "./CommentsTable";

const Reviews: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [reviews, setReviews] = useState<JSX.Element>();

    const createReviews = (reviews: Review[], beer: Beer, calendar: Calendar, average: Partial<Review>) => {
        const averageMyBeer = calculateAverage(reviews)
        const comments = reviews.map(r => r.comment).filter(c => !!c)
        return (
            <>
                <CalendarName calendar={calendar}/>
                <h1>Tilbakemeldinger</h1>
                <RatingTable average={average} averageMyBeer={averageMyBeer}/>
                <h2>Kommentarer</h2>
                <CommentsTable comments={comments}/>
            </>
        )
    }

    const getAverage = async (calendarId: string) => {
        const reviews = await reviewService.getByCalendar(calendarId)
        return calculateAverage(reviews)
    }

    const buildContent = async (id: string) => {
        try {
            const beer = await beerService.getById(id);
            if(!!beer.beerCalendars) {
                for (const beerCalendar of beer.beerCalendars) {
                    const average = await getAverage(beerCalendar.calendarId);
                    const calendar = await calendarService.getById(beerCalendar.calendarId);
                    const reviews = await reviewService.getByCalendarAndBeer(calendar.id, beer.id);
                    const reviewElements = createReviews(reviews, beer, calendar, average);
                    setReviews(reviewElements)
                }
            }
        } catch (e) {
            alertService.error(e)
        }
    }

    useEffect(() => {
        if (!!id) {
            buildContent(id as string);
        }
    }, [id])

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                {reviews}
            </div>
        </Layout>
    )
}
export default Reviews
