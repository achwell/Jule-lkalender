import Review from "../types/Review";

export const calculateAverage = (reviews: Review[]) => {
    const average: Partial<Review> = {
        ratingFeel: 0,
        ratingLabel: 0,
        ratingLooks: 0,
        ratingOverall: 0,
        ratingSmell: 0,
        ratingTaste: 0
    }
    if(reviews.length == 0) {
        return average
    }
    reviews.forEach(review => {
        average.ratingFeel = average.ratingFeel + review.ratingFeel
        average.ratingLabel = average.ratingLabel + review.ratingLabel
        average.ratingLooks = average.ratingLooks + review.ratingLooks
        average.ratingOverall = average.ratingOverall + review.ratingOverall
        average.ratingSmell = average.ratingSmell + review.ratingSmell
        average.ratingTaste = average.ratingTaste + review.ratingTaste
    })
    average.ratingFeel = (average.ratingFeel / reviews.length)
    average.ratingLabel = (average.ratingLabel / reviews.length)
    average.ratingLooks = (average.ratingLooks / reviews.length)
    average.ratingOverall = (average.ratingOverall / reviews.length)
    average.ratingSmell = (average.ratingSmell / reviews.length)
    average.ratingTaste = (average.ratingTaste / reviews.length)
    return average;
}
