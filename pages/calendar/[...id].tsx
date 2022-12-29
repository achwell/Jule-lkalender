import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {userService} from "../../../src/services";
import {Layout} from "../../../src/components/Layout";
import User from "../../../types/User";
import CalendarOverview from "./components/CalendarOverview";
import ReviewPage from "./components/ReviewPage";

const CalendarView: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [user, setUser] = useState<User>()
    const [calendarId, setCalendarId] = useState<string>()
    const [beerId, setBeerId] = useState<string>()
    const [action, setAction] = useState<string>()

    const findUser = async () => {
        const session = await getSession()
        const email = session?.user?.email
        if (!email) {
            router.push("/api/auth/signin")
            return
        }
        const user = await userService.getByEmail(email);
        setUser(user)
    }

    useEffect(() => {
        findUser();
        if (!!id && Array.isArray(id) && id.length > 0) {
            setCalendarId(id[0])
            if (id.length === 3) {
                setBeerId(id[1])
                setAction(id[2])
            } else if (id.length === 2) {
                setBeerId(id[1])
                setAction("list")
            } else {
                setAction("list")
            }
        } else {
            router.push("/calendar")
        }
    }, [id])

    const showContent = () => {
        if (action === "list" ) {
            return <CalendarOverview calendarId={calendarId!} user={user!}/>
        } else if (action === "review" ) {
            return <ReviewPage calendarId={calendarId!} beerId={beerId!} user={user!}/>
        }
        return null
    }

    if(!user) {
        return null
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                {showContent()}
            </div>
        </Layout>
    )

}
export default CalendarView
