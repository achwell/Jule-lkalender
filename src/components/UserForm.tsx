import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {alertService, userService} from "../services";
import TextInput from "./form/TextInput";
import DropdownInput, {Options} from "./form/DropdownInput";
import User from "../../types/User";

const UserForm: FC<{ user: User, isAdmin: boolean }> = ({user, isAdmin}) => {

    const {
        handleSubmit,
        formState: {errors},
        register,
        reset
    } = useForm<User>({defaultValues: user})

    useEffect(() => {
        reset(user)
    }, [])

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
                {isAdmin ?
                    <DropdownInput<User> id="role" name="role" label="Rolle" options={roles} register={register}
                                         rules={{required: "Du må velge en rolle"}} errors={errors}/>
                    : <TextInput<User> id="role" name="role" label="Rolle" placeholder="Rolle" register={register}
                                       errors={errors} disabled={true}/>
                }
            </div>
            {user.image ? <img src={user.image} alt={user.name}/> : ""}
            <Form.Group className="form-group">
                <Button type="submit" className="btn btn-primary">Lagre</Button>
                <Button type="button" className="btn btn-link" onClick={() => reset(user)}>Avbryt</Button>
            </Form.Group>
        </Form>
    )
}
export default UserForm
