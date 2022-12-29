import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../src/db"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    switch (req.method) {
        case 'GET':
            if (id.startsWith("user")) {
                return getBeersByUserId(id.substring(4));
            }
            return getBeerById(id);
        case 'PUT':
            return updateBeer(id);
        case 'DELETE':
            return deleteBeer(id);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }


    async function getBeersByUserId(userId: string) {
        const beer = await prisma.beer.findMany({where: {userId}})
        return res.status(200).json(beer);
    }

    async function getBeerById(id: string) {
        const beer = await prisma.beer.findUnique({where: {id}, include: {beerCalendars: true}})
        return res.status(200).json(beer);
    }

    async function updateBeer(id: string) {
        try {
            const beer = await prisma.beer.update({where: {id}, data: req.body})
            return res.status(200).json(beer);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    async function deleteBeer(id: string) {
        const beer = await prisma.beer.delete({where: {id}})
        return res.status(200).json(beer);
    }
}

export default handler
