import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../src/db"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    switch (req.method) {
        case 'GET':
            return getBeerCalendarById(id);
        case 'PUT':
            return updateBeerCalendar(id);
        case 'DELETE':
            return deleteBeerCalendar(id);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getBeerCalendarById(id: string) {
        if (id.indexOf("|") > -1) {
            const [calendarId, beerId] = id.split("|")
            const beerCalendar = await prisma.beerCalendar.findFirst({where: {calendarId, beerId}})
            return res.status(200).json(beerCalendar);
        } else {
            const beerCalendar = await prisma.beerCalendar.findUnique({where: {id}})
            return res.status(200).json(beerCalendar);
        }
    }

    async function updateBeerCalendar(id: string) {
        try {
            const data = req.body;
            const beerCalendar = await prisma.beerCalendar.update({where: {id}, data})
            return res.status(200).json(beerCalendar);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    async function deleteBeerCalendar(id: string) {
        const beerCalendar = await prisma.beerCalendar.delete({where: {id}})
        return res.status(200).json(beerCalendar);
    }
}

export default handler
