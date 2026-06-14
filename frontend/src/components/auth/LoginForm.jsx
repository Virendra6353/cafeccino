import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate 600ms loading spinner
    await new Promise((resolve) => setTimeout(resolve, 600));
    const success = login(data.email, data.password);
    setIsLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      form.setError('password', {
        type: 'manual',
        message: 'Invalid credentials or password too short.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-medium text-cafe-text-secondary uppercase tracking-wider">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="rohan@odoo-cafe.com"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-11 text-cafe-text-primary rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-cafe-danger text-xs font-normal" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-medium text-cafe-text-secondary uppercase tracking-wider">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-11 text-cafe-text-primary rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-cafe-danger text-xs font-normal" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cafe-accent hover:bg-[#e09820] text-cafe-bg font-display font-semibold text-[15px] h-11 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
