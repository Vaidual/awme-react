import React from 'react';
import {Box, TextField} from "@mui/material";
import {Controller, FormProvider, useForm, useFormContext} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const FormInput= (name, ...otherProps) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange, value, onBlur,ref} , fieldState: {error,isTouched}}) => (
                <TextField
                    otherProps
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    error={isTouched && !!error}
                    onBlur={onBlur}
                />
            )}
        />
    );
}

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required().min(5),
    password: yup.string().required(),
    repeatPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
});

function Login() {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '222',
            lastName: '',
            category: '',
            checkbox: [],
            radio: ''
        }
    });
    const { handleSubmit, control} = methods;
    const onSubmit = data => {
        console.log(data)
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    {/*                <TextField
                    name={"ss"}
                    onBlur={onBlur}
                    onChange={onChange}
                    variant={"filled"}
                    type={"text"}
                    label={"First Name"}
                     />*/}
                    <FormInput
                        name={"firstName"}
                        control={control}
                        label={"First Name"}
                        type={"text"}
                        variant={"filled"}
                        required
                    />
                    <FormInput
                        name={"email"}
                        control={control}
                        label={"Email"}
                        type={"text"}
                        variant={"filled"}
                        required
                    />
                </Box>
            </form>
        </FormProvider>
    );
}

export default Login;