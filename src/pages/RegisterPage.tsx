
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  const from = location.state?.from || '/';
  
  const handleRegister = (data: { name?: string, email: string, password: string }) => {
    if (data.name) {
      const success = register(data.name, data.email, data.password);
      if (success) {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Sign up to start booking tickets to your favorite shows and events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="register" onSubmit={handleRegister} />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
