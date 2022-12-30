import {NextPage} from "next"
import {SubmitHandler, useForm} from "react-hook-form"
import {Button, Form} from 'react-bootstrap';
import Beer from "../../types/Beer"
import {Layout} from "../../src/components/Layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";
import DateInput from "../../src/components/form/DateInput";
import {useRouter} from "next/router";
import {alertService, beerService, userService} from "../../src/services";
import TextInput from "../../src/components/form/TextInput";
import TextArea from "../../src/components/form/TextArea";
import NumberInput from "../../src/components/form/NumberInput";

const Edit: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [error, setError] = useState<number>()

    const {control, handleSubmit, formState: {errors}, register, reset, watch} = useForm<Beer>()

    const {bottleDate, brewedDate} = watch()

    async function getSessionUser() {
        const session = await getSession()
        return await userService.getByEmail(session!.user!.email!);
    }

    async function updateBeer(id: string) {
        const sessionUser = await getSessionUser()
        let user;
        if (!sessionUser || !sessionUser.email) {
            router.push("/api/auth/signin")
            return
        } else {
            user = sessionUser
            let beer: Beer
            let beerOwner = sessionUser;
            if (!!id) {
                beer = await beerService.getById(id)

                if (!beer) {
                    setError(404)
                    return
                }

                beerOwner = await userService.getById(beer.userId)
                if (!beerOwner || !user) {
                    setError(403)
                    return
                }
            } else {
                beer = {
                    beerCalendars: [],
                    id: "",
                    name: "",
                    style: "",
                    userId: user.id,
                    abv: 0,
                    ibu: 0,
                    ebc: 0,
                    bottleDate: new Date(),
                    brewedDate: new Date()
                }
            }

            if (user.role === "ADMIN" || beerOwner.email === user.email) {
                reset({
                    ...beer,
                    bottleDate: beer.bottleDate ? new Date(beer.bottleDate) : undefined,
                    brewedDate: beer.brewedDate ? new Date(beer.brewedDate) : undefined,
                });
                setError(undefined)
            } else {
                setError(403)
            }
        }
    }

    useEffect(() => {
        updateBeer(id as string);
    }, [id]);

    async function create(beer: Beer) {
        const sessionUser = await getSessionUser();
        beer.userId = sessionUser.id
        beerService.create(beer)
            .then(value => {
                alertService.success(value.name + " ble lagt til");
                router.push("/beers")
            })
            .catch(reason => alertService.error(reason))
    }

    async function update(beer: Beer) {
        beerService.update(beer.id, beer)
            .then(value => {
                alertService.success(value.name + " ble oppdatert");
                router.push("/beers")
            })
            .catch(reason => alertService.error(reason))
    }

    const onSubmit: SubmitHandler<Beer> = beer => {
        const data = {...beer}
        if (!!beer.abv) {
            data.abv = +beer.abv
        }
        if (!!beer.ibu) {
            data.ibu = +beer.ibu
        }
        if (!!beer.ebc) {
            data.ebc = +beer.ebc
        }

        if (!!beer.id) {
            update(data);
        } else {
            create(data);
        }
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>{id ? "Rediger øl" : "Legg til øl"}</h1>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <TextInput<Beer> id="name" name="name" label="Navn" placeholder="Navn" register={register} rules={{ required: 'Navn er påkrevet' }} errors={errors}/>
                        <TextInput<Beer> id="style" name="style" label="Stil" placeholder="Stil" register={register} rules={{ required: 'Stil er påkrevet' }} errors={errors}/>
                        <TextArea<Beer> id="description" name="description" label="Beskrivelse" placeholder="Beskrivelse" register={register} errors={errors} rows={5}/>
                    </div>
                    <div className="form-row">
                        <NumberInput<Beer> id="abv" name="abv" label="Abv" placeholder="Abv" register={register} errors={errors}/>
                        <NumberInput<Beer> id="ibu" name="ibu" label="Ibu" placeholder="Ibu" register={register} errors={errors}/>
                        <NumberInput<Beer> id="ebc" name="ebc" label="Ebc" placeholder="Ebc" register={register} errors={errors}/>
                    </div>
                    <div className="form-row">
                        <TextInput<Beer> id="recipe" name="recipe" label="Link til oppskrift" placeholder="Link til oppskrift" register={register} errors={errors}/>
                        <TextInput<Beer> id="untapped" name="untapped" label="Link til UnTapped" placeholder="Link til UnTapped" register={register} errors={errors}/>
                    </div>
                    <div className="form-row">
                        <DateInput<Beer> id="brewedDate" name="brewedDate" label="Bryggedato" placeholder="Bryggedato" control={control} errors={errors}/>
                        <DateInput<Beer> id="bottleDate" name="bottleDate" label="Tappedato" placeholder="Tappedato" control={control} errors={errors}/>
                    </div>
                    <Form.Group className="form-group">
                        <Button type="submit" className="btn btn-primary">Lagre</Button>
                        <Link href={id ? {pathname: "/beers/details/", query: {id}} : "/beers"}
                              className="btn btn-link active">
                            Avbryt
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </Layout>
    )
}
export default Edit
