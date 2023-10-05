import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Link } from '@mui/material';
import { Container, Paper } from '@mui/material';
import { MainButton, CustomTextField } from './styles';

interface SignInProps {
  onSubmit: (formData: SignInFormData) => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
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
        <Container maxWidth="xs">
            <Paper style={{ padding: '20px', background: '#F9F9F9' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                            <MainButton variant="contained" type="submit" sx={{ margin:'0 0 1rem 0' }}>
                                Sign In
                            </MainButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignIn;
