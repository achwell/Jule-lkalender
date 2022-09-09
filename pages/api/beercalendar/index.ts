import {prisma} from "../../../src/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return createBeerCalendar();
        case 'GET':
            return getBeerCalendars();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createBeerCalendar() {
        const data = JSON.parse(req.body.body);
        const beerCalendar = await prisma.beerCalendar.create({data: {...data, day: +data.day}})
        return res.status(201).json(beerCalendar);
    }

    async function getBeerCalendars() {
        const beerCalendars = await prisma.beerCalendar.findMany()
        return res.status(200).json(beerCalendars);
    }
}

export default handler;
