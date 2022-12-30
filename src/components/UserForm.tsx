import {FC, forwardRef, MutableRefObject, PropsWithoutRef, useEffect, useImperativeHandle, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import TextInput from "./form/TextInput";
import DropdownInput, {Options} from "./form/DropdownInput";
import User from "../../types/User";
import {alertService, userService} from "../services";

interface Props {
    user: User | undefined,
    isAdmin: boolean,
    showButtons: boolean
}

const UserForm = forwardRef(({user, isAdmin, showButtons = true}:Props, ref) => {
    useImperativeHandle(ref, () => ({
        submit() {
            onSubmit(formUser)
        }
    }));

    const [initialized, setInitialized] = useState(false)

    const {
        handleSubmit,
        formState: {errors},
        register,
        reset,
        watch
    } = useForm<User>({defaultValues: user})

    const formUser = watch()

    useEffect(() => {

        if(!!user && !initialized) {
            reset(user)
            setInitialized(true)
        }
    }, [user])

    const roles: Options[] = [
        {key: "USER", value: "Brygger"},
        {key: "ADMIN", value: "Administrator"}
    ];

    const onSubmit = user => {
        if (!user.id) {
            userService.create(user)
                .then(value => alertService.success("Bruker " + user.name + " opprettet"))
                .catch(reason => alertService.error(reason))
        } else {
            userService.update(user.id, user)
                .then(value => alertService.success("Bruker " + user.name + " oppdatert"))
                .catch(reason => alertService.error(reason))
        }
    }


    if (!user) {
        return null
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <TextInput<User> id="name" name="name" label="Navn" placeholder="Navn" register={register}
                                 rules={{required: 'Navn er påkrevet'}} errors={errors}/>
                <TextInput<User> id="email" name="email" label="Epost" placeholder="Epost" register={register}
                                 errors={errors} disabled={true}/>
                {isAdmin ?
                    <DropdownInput<User> id="role" name="role" label="Rolle" options={roles} register={register}
                                         rules={{required: "Du må velge en rolle"}} errors={errors}/>
                    : <TextInput<User> id="role" name="role" label="Rolle" placeholder="Rolle" register={register}
                                       errors={errors} disabled={true}/>
                }
            </div>
            {user.image ? <img src={user.image} alt={user.name}/> : ""}
            {showButtons && <Form.Group className="form-group">
                <Button type="submit" className="btn btn-primary">Lagre</Button>
                <Button type="button" className="btn btn-link" onClick={() => reset(user)}>Avbryt</Button>
            </Form.Group>}
        </Form>
    )
})
export default UserForm
