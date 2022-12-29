import {FC, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {alertService, reviewService} from "../../../../src/services";
import NumberInput from "../../../../src/components/form/NumberInput";
import TextArea from "../../../../src/components/form/TextArea";
import User from "../../../../types/User";
import Review from "../../../../types/Review";

const defaultValues = {
    id: undefined,
    ratingFeel: 0,
    ratingLabel: 0,
    ratingLooks: 0,
    ratingOverall: 0,
    ratingSmell: 0,
    ratingTaste: 0,
    comment: "",
    createdAt: undefined,
    beer: undefined,
    calendar: undefined,
    reviewer: undefined
}

const ReviewPage: FC<{ calendarId: string, beerId: string, user: User }> = ({calendarId, beerId, user}) => {

    const router = useRouter()

    const {handleSubmit, formState: {errors}, register, reset, watch} = useForm<Partial<Review>>({defaultValues})

    const {id: formId} = watch()

    useEffect(() => {
        reset(defaultValues);
    }, [])

    useEffect(() => {
        getReview();
    }, [calendarId, beerId])

    const findReview = async (reviewer: User, calendarId: string, beerId: string) => {
        const review = await reviewService.getByCalendarAndBeerAndUser(calendarId, beerId, reviewer.id)
        if (!!review && !!review.length > 0) {
            return review[0]
        }
        return {
            beerId,
            calendarId,
            reviewerId: reviewer.id,
            ratingFeel: 0,
            ratingLabel: 0,
            ratingLooks: 0,
            ratingOverall: 0,
            ratingSmell: 0,
            ratingTaste: 0
        }
    }

    const getReview = async () => {
        try {
            reset(await findReview(user, calendarId, beerId))
        } catch (e) {
            alertService.error(e)
        }
    }

    const onSubmit: SubmitHandler<Review> = review => {
        if (!review.ratingFeel) review.ratingFeel = 0
        if (!review.ratingLabel) review.ratingLabel = 0
        if (!review.ratingLooks) review.ratingLooks = 0
        if (!review.ratingOverall) review.ratingOverall = 0
        if (!review.ratingSmell) review.ratingSmell = 0
        if (!review.ratingTaste) review.ratingTaste = 0

        const data = {...review}

        data.ratingFeel = +review.ratingFeel
        data.ratingLabel = +review.ratingLabel
        data.ratingLooks = +review.ratingLooks
        data.ratingOverall = +review.ratingOverall
        data.ratingSmell = +review.ratingSmell
        data.ratingTaste = +review.ratingTaste

        if (!formId) {
            data.createdAt = new Date()
            reviewService.create(data)
                .then(value => {
                    alertService.success("Omtale ble oppdatert");
                    router.push("/calendar")
                })
                .catch(reason => alertService.error(reason))
        } else {
            reviewService.update(formId, data)
                .then(value => {
                    alertService.success("Omtale ble oppdatert");
                    router.push("/calendar")
                })
                .catch(reason => alertService.error(reason))
        }
    }

    return (
        <>
            <h1>{!!formId ? "Rediger din stemme" : "Gi din stemme"}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <NumberInput field="ratingTaste" label="Smak" error={errors.ratingTaste} min={0} max={6}
                                 step={0.1} register={register}/>
                    <NumberInput field="ratingSmell" label="Lukt" error={errors.ratingSmell} min={0} max={6}
                                 step={0.1} register={register}/>
                    <NumberInput field="ratingLooks" label="Utseende" error={errors.ratingLooks} min={0} max={6}
                                 step={0.1} register={register}/>
                    <NumberInput field="ratingFeel" label="Følelse" error={errors.ratingFeel} min={0} max={6}
                                 step={0.1} register={register}/>
                    <NumberInput field="ratingLabel" label="Etikett" error={errors.ratingLabel} min={0} max={6}
                                 step={0.1} register={register}/>
                    <NumberInput field="ratingOverall" label="Overall" error={errors.ratingOverall} min={0} max={6}
                                 step={0.1} register={register}/>
                    <TextArea field="comment" label="Kommentar" rows={5} error={errors.comment}
                              register={register("comment")}/>
                </div>
                <Form.Group className="form-group">
                    <Button type="submit" className="btn btn-primary">Send!</Button>
                    <Link href={`/calendar/${calendarId}`} className="btn btn-link">
                        Avbryt
                    </Link>
                </Form.Group>
            </Form>
        </>
    )
}
export default ReviewPage
