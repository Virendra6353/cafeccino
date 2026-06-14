import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader2, CheckCircle2, Printer, Plus } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { FLOORS } from '../data/dummyData';
import { formatINR } from '../lib/utils';
import TopNav from '../components/pos/TopNav';
import CustomerForm from '../components/payment/CustomerForm';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import DiscountInput from '../components/payment/DiscountInput';
import OrderSummaryPanel from '../components/payment/OrderSummaryPanel';

import { Form } from '../components/ui/form';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent } from '../components/ui/dialog';

// Form validation schema
const paymentSchema = z.object({
  customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  mobile: z.string()
    .regex(/^\d{10}$/, 'Mobile number must be a 10-digit number')
    .optional()
    .or(z.literal('')),
  tableId: z.string().min(1, 'Please select a table'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  transactionReference: z.string().optional(),
  upiId: z.string().optional(),
});

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      customerName: '',
      email: '',
      mobile: '',
      tableId: 't3', // defaults to T-03 (t3)
      paymentMethod: 'cash', // defaults to cash
      transactionReference: '',
      upiId: '',
    },
  });

  // Watch fields for reactivity
  const watchedName = form.watch('customerName');
  const watchedMethod = form.watch('paymentMethod');
  const watchedTableId = form.watch('tableId');

  // Find table details
  let selectedTable = null;
  for (const floor of FLOORS) {
    const table = floor.tables.find((t) => t.id === watchedTableId);
    if (table) {
      selectedTable = table;
      break;
    }
  }
  const selectedTableNumber = selectedTable ? selectedTable.number : 'T-03';

  const isCartEmpty = items.length === 0;
  const isFormValid = watchedName && watchedName.trim().length >= 2;
  const isSubmitDisabled = isCartEmpty || !isFormValid || isLoading;

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate 800ms API submit delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSuccessOpen(true);
  };

  const handleNewOrder = () => {
    clearCart();
    setIsSuccessOpen(false);
    navigate('/dashboard');
  };

  const methodLabelMap = {
    cash: 'Cash',
    card: 'Card',
    upi: 'UPI',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col bg-cafe-bg select-none"
    >
      {/* Top sticky navigation with Back to Menu button */}
      <TopNav showBack={true} selectedTableNumber={selectedTableNumber} />

      {/* Main split screen panel content */}
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-6 md:gap-8 items-start"
          >
            {/* Left panel: Input Forms (shown below summary on mobile) */}
            <div className="space-y-6 order-2 lg:order-1">
              <CustomerForm form={form} />
              
              <PaymentMethodSelector form={form} />

              <DiscountInput />

              {/* Place Order CTA Button */}
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full h-14 bg-cafe-accent hover:bg-[#e09820] text-cafe-bg font-display font-bold text-base md:text-lg rounded-xl transition-all shadow-accent flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5.5 w-5.5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Place Order &middot; {formatINR(total)}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Right panel: Order Summary review card (shown top on mobile) */}
            <div className="order-1 lg:order-2">
              <OrderSummaryPanel paymentMethod={watchedMethod} />
            </div>
          </form>
        </Form>
      </div>

      {/* Success Dialog Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-md w-full bg-cafe-surface border border-cafe-border p-8 rounded-2xl shadow-elevated focus-visible:outline-none flex flex-col items-center text-center">
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-5 shrink-0"
          >
            <CheckCircle2 className="h-16 w-16 text-cafe-success" />
          </motion.div>

          {/* Success Title */}
          <h2 className="font-display font-bold text-xl md:text-2xl text-cafe-text-primary mb-2">
            Order Placed!
          </h2>
          <p className="font-sans font-normal text-sm text-cafe-text-secondary mb-6 leading-relaxed max-w-[280px]">
            Order <span className="font-semibold text-cafe-text-primary">#ORD-0042</span> has been successfully sent to the kitchen.
          </p>

          {/* Order quick metadata preview rows */}
          <div className="w-full bg-cafe-surface-raised border border-cafe-border/50 rounded-xl p-4 space-y-3 mb-8 text-xs font-sans">
            <div className="flex justify-between items-center text-cafe-text-secondary">
              <span>Customer</span>
              <span className="font-semibold text-cafe-text-primary">
                {form.getValues('customerName')}
              </span>
            </div>
            <div className="flex justify-between items-center text-cafe-text-secondary">
              <span>Table Info</span>
              <span className="font-semibold text-cafe-text-primary">
                {selectedTableNumber} ({selectedTable?.floor || 'Ground Floor'})
              </span>
            </div>
            <div className="flex justify-between items-center text-cafe-text-secondary">
              <span>Amount Paid</span>
              <span className="font-mono font-bold text-cafe-accent text-[13px]">
                {formatINR(total)}
              </span>
            </div>
            <div className="flex justify-between items-center text-cafe-text-secondary">
              <span>Payment Mode</span>
              <span className="font-semibold text-cafe-text-primary">
                {methodLabelMap[watchedMethod] || 'Cash'}
              </span>
            </div>
          </div>

          {/* Button actions row */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              type="button"
              onClick={() => alert('Printing receipt #ORD-0042...')}
              className="bg-cafe-surface-raised border border-cafe-border hover:border-cafe-text-primary text-cafe-text-primary font-sans font-semibold text-sm h-11 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="h-4.5 w-4.5" />
              <span>Print Receipt</span>
            </Button>
            <Button
              type="button"
              onClick={handleNewOrder}
              className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg font-display font-bold text-sm h-11 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>New Order</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
export default PaymentPage;
