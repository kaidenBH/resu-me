import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { MainButton, CustomTextField, CustomTypography, CustomPaper } from './styles';

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
    }

    return (
        <Container style={{ padding: 0 }} maxWidth="xs" >
            <CustomPaper sx={{ borderRadius: '15px 0 0 15px' }}>
                <form onSubmit={handleSubmit}>
                    <CustomTypography variant="h4" >Sign In</CustomTypography>
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
            </CustomPaper>
        </Container>
    );
};

export default SignIn;
