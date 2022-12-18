import React from 'react';
import {Box, Button, TextField, useMediaQuery} from "@mui/material";
import * as yup from "yup";
import {Formik} from "formik";

const schema = yup.object().shape({
    firstName: yup.string().required('Please '),
    lastName: yup.string().required('Please provide a subject'),
    email: yup.string().email().required('Please provide a subject'),
    password: yup.string().required('Please provide a subject'),
    repeatPassword: yup.string().required('Please provide a subject').oneOf([yup.ref('password')], 'Passwords must match'),
});

const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
};

function Login() {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box display={"flex"} justifyContent={"center"} sx={{transform: 'translateY(20%)'}}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={defaultValues}
                validationSchema={schema}
            >
                {({
                      values,
                      errors,
                      touched,
                      isValidating,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName ? errors.firstName : ' '}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName ? errors.lastName : ' '}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email ? errors.email : ' '}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password ? errors.password : ' '}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Repeat Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.repeatPassword}
                                name="repeatPassword"
                                error={!!touched.repeatPassword && !!errors.repeatPassword && !isValidating}
                                helperText={touched.repeatPassword ? errors.repeatPassword : ' '}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default Login;