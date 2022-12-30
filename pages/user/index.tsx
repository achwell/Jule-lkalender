import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {Layout} from "../../src/components/Layout";
import User from "../../types/User";
import {alertService, userService} from "../../src/services";
import UserForm from "../../src/components/UserForm";

const UserPage: NextPage = () => {

    const router = useRouter()
    const [user, setUser] = useState<User>()

    const updateUser = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const {user: {email}} = session;
        const user = await userService.getByEmail(email)
        setUser(user)
    }

    useEffect(() => {
        updateUser()
    }, [])

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <UserForm user={user} isAdmin={user?.role === "ADMIN"}/>
            </div>
        </Layout>
    )
}
export default UserPage
