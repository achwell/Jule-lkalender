import {prisma} from "../../../src/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return createCalendar();
        case 'GET':
            return getCalendars();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createCalendar() {
        const data = JSON.parse(req.body.body);
        const calendar = await prisma.calendar.create({data})
        return res.status(201).json(calendar);
    }

    async function getCalendars() {
        const calendar = await prisma.calendar.findMany({include: {beerCalendars: true}})
        return res.status(200).json(calendar);
    }
}

export default handler;
