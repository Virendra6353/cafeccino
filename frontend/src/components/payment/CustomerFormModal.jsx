import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { X, UserPlus, UserCog, User, Mail, Phone, AlertCircle, Check, Loader2 } from 'lucide-react';

import { Dialog, DialogContent, DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.union([z.string().email('Enter a valid email'), z.literal('')]).optional(),
  phone: z.union([
    z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit number'),
    z.literal('')
  ]).optional(),
});

export const CustomerFormModal = ({ mode = 'create', customer = null, isOpen, onClose, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // Pre-fill values in edit mode
  useEffect(() => {
    if (customer && mode === 'edit') {
      reset({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [customer, mode, reset, isOpen]);

  const onSubmit = (data) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave(data);
      onClose();
    }, 400);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full bg-[#1A1A1A] border border-[#2E2E2E] p-0 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden focus-visible:outline-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full flex flex-col"
        >
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-[#2E2E2E] flex items-center justify-between relative select-none">
            <div className="flex items-center gap-2">
              {mode === 'create' ? (
                <>
                  <UserPlus className="h-5 w-5 text-cafe-accent shrink-0" />
                  <h3 className="font-display font-bold text-lg text-cafe-text-primary">
                    Add New Guest
                  </h3>
                </>
              ) : (
                <>
                  <UserCog className="h-5 w-5 text-cafe-accent shrink-0" />
                  <h3 className="font-display font-bold text-lg text-cafe-text-primary">
                    Edit Guest
                  </h3>
                </>
              )}
            </div>
            
            <DialogClose className="absolute top-4 right-4 text-cafe-text-secondary hover:text-cafe-text-primary transition-colors cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-accent">
              <X className="h-4.5 w-4.5 shrink-0" />
            </DialogClose>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans font-medium text-xs text-cafe-text-secondary select-none">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    {...register('name')}
                    disabled={isSaving}
                    className="w-full pl-10 pr-4 bg-[#242424] border-[#2E2E2E] focus:border-cafe-accent focus:ring-2 focus:ring-cafe-accent/20 h-[42px] text-sm text-cafe-text-primary rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1.5 text-cafe-danger mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-sans font-normal text-xs">{errors.name.message}</span>
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-sans font-medium text-xs text-cafe-text-secondary select-none">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="priya@gmail.com"
                    {...register('email')}
                    disabled={isSaving}
                    className="w-full pl-10 pr-4 bg-[#242424] border-[#2E2E2E] focus:border-cafe-accent focus:ring-2 focus:ring-cafe-accent/20 h-[42px] text-sm text-cafe-text-primary rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1.5 text-cafe-danger mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-sans font-normal text-xs">{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-sans font-medium text-xs text-cafe-text-secondary select-none">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    {...register('phone')}
                    disabled={isSaving}
                    className="w-full pl-10 pr-4 bg-[#242424] border-[#2E2E2E] focus:border-cafe-accent focus:ring-2 focus:ring-cafe-accent/20 h-[42px] text-sm text-cafe-text-primary rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-1.5 text-cafe-danger mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-sans font-normal text-xs">{errors.phone.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#2E2E2E] flex justify-end gap-3 select-none">
              <Button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="bg-[#242424] border border-[#2E2E2E] text-cafe-text-secondary hover:border-cafe-text-primary hover:text-cafe-text-primary hover:bg-[#242424] px-5 h-10 rounded-lg font-sans font-medium text-sm transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg px-5 h-10 rounded-lg font-display font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-cafe-bg shrink-0" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-cafe-bg shrink-0" />
                    <span>{mode === 'create' ? 'Save Guest' : 'Save Changes'}</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormModal;
