import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../src/db"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    switch (req.method) {
        case 'GET':
            return getReviewById(id!);
        case 'PUT':
            return updateReview(id!);
        case 'DELETE':
            return deletReview(id!);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getReviewById(id: string) {
        let calendarId: string
        let beerId: string
        let reviewerId: string
        const ids = id.split("|")
        if (ids.length === 1) {
            calendarId = id
        } else if (ids.length === 2) {
            calendarId = ids[0]
            beerId = ids[1]
        } else if (ids.length === 3) {
            calendarId = ids[0]
            beerId = ids[1]
            reviewerId = ids[2]
        }
        const reviews = await prisma.review.findMany({where: {calendarId}, include: {reviewer: true, beer: true}})
        let filteredReviews = reviews
        if (!!beerId) {
            filteredReviews = filteredReviews.filter(review => review.beerId === beerId)
        }
        if (!!reviewerId) {
            filteredReviews = filteredReviews.filter(review => review.reviewerId === reviewerId)
        }
        return res.status(200).json(filteredReviews);
    }

    async function updateReview(id: string) {
        try {
            const data = req.body;
            data.reviewer = undefined
            data.beer = undefined
            const review = await prisma.review.update({where: {id}, data})
            return res.status(200).json(review);
        } catch (error) {
            console.error({error})
            return res.status(400).json({message: error});
        }
    }

    async function deletReview(id: string) {
        const review = await prisma.review.delete({where: {id}})
        return res.status(200).json(review);
    }
}

export default handler
