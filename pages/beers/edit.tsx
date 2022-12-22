import {NextPage} from "next"
import {useForm, SubmitHandler} from "react-hook-form"
import {Button, Form} from 'react-bootstrap';
import Beer from "../../types/Beer"
import {Layout} from "../../src/components/Layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";
import TextInput from "../../src/components/form/TextInput";
import NumberInput from "../../src/components/form/NumberInput";
import TextArea from "../../src/components/form/TextArea";
import DateInput from "../../src/components/form/DateInput";
import {useRouter} from "next/router";
import {beerService, userService} from "../../src/services";

const Edit: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [error, setError] = useState<number>()

    const {control, handleSubmit, formState: {errors}, register, reset} = useForm<Beer>()

    async function updateBeer(id: string) {
        const session = await getSession()
        const sessionUser = await userService.getByEmail(session!.user!.email!)
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }

        const beer = await beerService.getById(id)

        if (!beer) {
            setError(404)
            return
        }
        const beerOwner = await userService.getById(beer.userId)


        if (!beerOwner || !session || !session.user) {
            setError(403)
            return
        }

        if (sessionUser.role === "ADMIN" || beerOwner.email === sessionUser.email) {
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

    useEffect(() => {
        if (id) {
            updateBeer(id as string);
        }
    }, [id]);

    const onSubmit: SubmitHandler<Beer> = beer => {
        console.log(beer);
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
                        <TextInput field="name" label="Navn" error={errors.name}
                                   register={register("name", {required: "Navn er påkrevet"})}/>
                        <TextInput field="style" label="Stil" error={errors.style}
                                   register={register("style", {required: "Stil er påkrevet"})}/>
                        <TextArea field="description" label="Beskrivelse" rows={5} error={errors.description}
                                  register={register("description")}/>
                    </div>
                    <div className="form-row">
                        <NumberInput field="abv" label="Abv" error={errors.abv} register={register("abv")}/>
                        <NumberInput field="ibu" label="Ibu" error={errors.ibu} register={register("ibu")}/>
                        <NumberInput field="ebc" label="Ebc" error={errors.ebc} register={register("ebc")}/>
                    </div>
                    <div className="form-row">
                        <TextInput field="recipe" label="Link til oppskrift" error={errors.recipe}
                                   register={register("recipe")}/>
                        <TextInput field="untapped" label="Link til UnTapped" error={errors.untapped}
                                   register={register("untapped")}/>
                    </div>
                    <div className="form-row">
                        <DateInput field="brewedDate" label="Bryggedato" control={control}/>
                        <DateInput field="bottleDate" label="Tappedato" control={control}/>
                    </div>
                    <Form.Group className="form-group">
                        <Button type="submit" className="btn btn-primary">Lagre</Button>
                        <Link href={id ? {pathname: "/beers/details/", query: {id}} : "/beers"}  className="btn btn-link active">
                            Avbryt
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </Layout>
    )
}
export default Edit
