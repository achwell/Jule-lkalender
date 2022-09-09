import {prisma} from "../../../src/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return createUser();
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createUser() {
        const data = JSON.parse(req.body.body);
        const user = await prisma.user.create({data})
        return res.status(201).json(user);
    }

    async function getUsers() {
        const users = await prisma.user.findMany()
        return res.status(200).json(users);
    }
}

export default handler;
