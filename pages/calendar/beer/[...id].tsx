import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import Beer from "../../../types/Beer";
import {alertService, beerService} from "../../../src/services";
import {Layout} from "../../../src/components/Layout";

const CalendarView: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [beer, setBeer] = useState<Beer>()

    const getBeer = async (id: string) => {
        try {
            const b = await beerService.getById(id)
            setBeer(b)
        } catch (e) {
            alertService.error(e)
        }
    }

    useEffect(() => {
        if (!!id) {
            getBeer(id as string);
        }
    }, [id])

    if (!beer) {
        return null
    }

    return <Layout>
        <div className="col-md-6 offset-md-3 mt-5">
            <h1>{beer.name}</h1>
            <table className="table table-striped">
                <tbody>
                <tr>
                    <td>Stil</td>
                    <td>{beer.style}</td>
                </tr>
                <tr>
                    <td>Beskrivelse</td>
                    <td>{beer.description}</td>
                </tr>
                <tr>
                    <td>Abv</td>
                    <td>{beer.abv}</td>
                </tr>
                <tr>
                    <td>Ibu</td>
                    <td>{beer.ibu}</td>
                </tr>
                <tr>
                    <td>Oppskrift</td>
                    <td>{beer.recipe}</td>
                </tr>
                <tr>
                    <td>Untapped</td>
                    <td>{beer.untapped}</td>
                </tr>
                <tr>
                    <td>Bryggedato</td>
                    <td>{beer.brewedDate ? (new Date(beer.brewedDate)).toLocaleDateString(): ""}</td>
                </tr>
                <tr>
                    <td>Tappedato</td>
                    <td>{beer.bottleDate ? (new Date(beer.bottleDate)).toLocaleDateString(): ""}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </Layout>

}
export default CalendarView
