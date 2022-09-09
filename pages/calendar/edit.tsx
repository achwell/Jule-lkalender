import {NextPage} from "next"
import {useForm, SubmitHandler} from "react-hook-form"
import {Button, Form} from 'react-bootstrap';
import {Layout} from "../../src/components/Layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";
import TextInput from "../../src/components/form/TextInput";
import {useRouter} from "next/router";
import {alertService, calendarService, userService} from "../../src/services";
import Calendar from "../../types/Calendar";
import CheckboxInput from "../../src/components/form/CheckboxInput";
import NumberInput from "../../src/components/form/NumberInput";

const Edit: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [error, setError] = useState<number>()

    const {handleSubmit, formState: {errors}, register, reset} = useForm<Calendar>()

    async function updateCalendar(id?: string) {
        const session = await getSession()
        const sessionUser = await userService.getByEmail(session!.user!.email!)
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }

        const calendar = id ? await calendarService.getById(id) : {
            id: "",
            name: "",
            year: new Date().getFullYear(),
            isPublic: false,
            archived: false
        }

        if (!calendar) {
            setError(404)
            return
        }

        if (sessionUser.role === "ADMIN") {
            reset(calendar);
            setError(undefined)
        } else {
            setError(403)
        }
    }

    useEffect(() => {
        if (id) {
            updateCalendar(id as string);
        } else {
            updateCalendar(undefined);
        }
    }, [id]);

    const onSubmit: SubmitHandler<Calendar> = async calendar => {
        const result = calendar.id
            ? await calendarService.update(calendar.id, calendar)
            : await calendarService.create(calendar)
        const action = calendar.id? "oppdatert" : "opprettet"
        alertService.info(`Kalender ${result.name} ${action}`)
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>{id ? "Rediger kalender" : "Legg til kalender"}</h1>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <TextInput field="name" label="Navn" error={errors.name}
                                   register={register("name", {required: "Navn er påkrevet"})}/>
                        <NumberInput field="year" label="År" error={errors.year}
                                   register={register("year", {required: "År er påkrevet"})}/>
                        <CheckboxInput field="isPublic" label="Offentlig" error={errors.isPublic}
                                       register={register("isPublic")}/>
                        <CheckboxInput field="archived" label="Arkivert" error={errors.archived}
                                       register={register("archived")}/>
                    </div>
                    <Form.Group className="form-group">
                        <Button type="submit" className="btn btn-primary">Lagre</Button>
                        <Link href="/calendar">
                            <a className="btn btn-link active">Avbryt</a>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </Layout>
    )
}
export default Edit
