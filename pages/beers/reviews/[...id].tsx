import {NextPage} from "next";
import {useRouter} from "next/router";

const Reviews: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    return (
        <div>Reviews</div>
    )
}
export default Reviews
