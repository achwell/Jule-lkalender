import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../src/db"

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    switch (req.method) {
        case 'GET':
            if (id.startsWith("email")) {
                return getUserByEmail(id.substring(5));
            }
            return getUserById(id);
        case 'PUT':
            return updateUser(id);
        case 'DELETE':
            return deleteUser(id);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return res.status(200).json(user);
    }

    async function getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return res.status(200).json(user);
    }

    async function updateUser(id: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: req.body
            })
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    async function deleteUser(id: string) {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return res.status(200).json(user);
    }
}

export default handler
