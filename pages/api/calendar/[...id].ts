import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../src/db"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    switch (req.method) {
        case 'GET':
            return getCalendarById(id);
        case 'PUT':
            return updateCalendar(id);
        case 'DELETE':
            return deleteCalendar(id);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getCalendarById(id: string) {
        const calendar = await prisma.calendar.findUnique({where: {id}, include: {beerCalendars: true}})
        return res.status(200).json(calendar);
    }

    async function updateCalendar(id: string) {
        try {
            const data = req.body;
            const calendar = await prisma.calendar.update({where: {id}, data})
            return res.status(200).json(calendar);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    async function deleteCalendar(id: string) {
        const calendar = await prisma.calendar.delete({where: {id}})
        return res.status(200).json(calendar);
    }
}

export default handler
