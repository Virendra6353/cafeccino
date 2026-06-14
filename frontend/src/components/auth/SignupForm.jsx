import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignupForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate signup request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    toast({
      title: 'Account created!',
      description: 'Please sign in with your credentials.',
      variant: 'default',
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-medium text-cafe-text-secondary uppercase tracking-wider">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Rohan Mehta"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-cafe-danger text-xs font-normal" />
            </FormItem>
          )}
        />

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
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary rounded-md"
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
                  placeholder="Create a password"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-cafe-danger text-xs font-normal" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-medium text-cafe-text-secondary uppercase tracking-wider">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary rounded-md"
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
          className="w-full bg-cafe-accent hover:bg-[#e09820] text-cafe-bg font-display font-semibold text-[15px] h-11 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </Form>
  );
};
export default SignupForm;
