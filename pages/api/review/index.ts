import {prisma} from "../../../src/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return createReview();
        case 'GET':
            return getReviews();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createReview() {
        const review = await prisma.review.create({data: req.body})
        return res.status(201).json(review);
    }

    async function getReviews() {
        const reviews = await prisma.review.findMany()
        return res.status(200).json(reviews);
    }
}

export default handler;
