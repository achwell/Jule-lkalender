import {prisma} from "../../../src/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return createBeer();
        case 'GET':
            return getBeers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createBeer() {
        const data = JSON.parse(req.body.body);
        const beer = await prisma.beer.create({data})
        return res.status(201).json(beer);
    }

    async function getBeers() {
        const beers = await prisma.beer.findMany({
            include: {
                beerCalendars: true,
            },
        })
        return res.status(200).json(beers);
    }
}

export default handler;
