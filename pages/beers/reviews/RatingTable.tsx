import {FC} from "react";
import Review from "../../../types/Review";

const RatingTable: FC<{ average: Partial<Review>, averageMyBeer: Partial<Review> }> = ({average, averageMyBeer}) => {

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th></th>
                <th>Snitt ditt øl</th>
                <th>Snitt kalender</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Smak</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingTaste}</td>
            </tr>
            <tr>
                <td>Følelse</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingFeel}</td>
            </tr>
            <tr>
                <td>Lukt</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingSmell}</td>
            </tr>
            <tr>
                <td>Etikett</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingLabel}</td>
            </tr>
            <tr>
                <td>Utseende</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingLooks}</td>
            </tr>
            <tr>
                <td>Overall</td>
                <td>{averageMyBeer.ratingTaste}</td>
                <td>{average.ratingOverall}</td>
            </tr>
            </tbody>
        </table>
    )

}
export default RatingTable
