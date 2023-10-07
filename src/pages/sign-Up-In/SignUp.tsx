import React, { useState } from 'react';
import {  Grid } from '@mui/material';
import { Container } from '@mui/material';
import { MainButton, CustomTextField, CustomTypography, CustomPaper } from './styles';

interface SignUpProps {
  onSubmit: (formData: SignUpFormData) => void;
}

interface SignUpFormData {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container style={{ padding: 0 }} maxWidth="xs" >
            <CustomPaper sx={{ borderRadius: '0 15px 15px 0' }}>
                <CustomTypography variant='h4'>Sign Up</CustomTypography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <CustomTextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <CustomTextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <CustomTextField
                            fullWidth
                            label="Repeat Password"
                            variant="outlined"
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <MainButton variant="contained" type="submit" sx={{ margin:'0 0 1rem 0' }}>
                                Sign Up
                            </MainButton>
                        </Grid>
                    </Grid>
                </form>
            </CustomPaper>
        </Container>
    );
};

export default SignUp;
