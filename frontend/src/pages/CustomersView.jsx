import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Mail, Phone, Link as LinkIcon, UserCheck, UserMinus, Pencil, Trash2, UsersRound } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { DUMMY_CUSTOMERS } from '../data/dummyData';
import CustomerFormModal from '../components/payment/CustomerFormModal';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

// Deterministic colors based on first letter
const getAvatarColors = (name = '') => {
  const char = (name[0] || 'A').toUpperCase();
  if (char >= 'A' && char <= 'E') {
    return { bg: 'bg-[#6C63FF]/20', text: 'text-[#6C63FF]' };
  } else if (char >= 'F' && char <= 'J') {
    return { bg: 'bg-[#FF6584]/20', text: 'text-[#FF6584]' };
  } else if (char >= 'K' && char <= 'O') {
    return { bg: 'bg-[#43CFAB]/20', text: 'text-[#43CFAB]' };
  } else if (char >= 'P' && char <= 'T') {
    return { bg: 'bg-[#F5A623]/20', text: 'text-[#F5A623]' };
  } else {
    return { bg: 'bg-[#56CCF2]/20', text: 'text-[#56CCF2]' };
  }
};

export const CustomersView = () => {
  const { toast } = useToast();
  const { linkedCustomer, linkCustomer, unlinkCustomer } = useCart();

  const [customers, setCustomers] = useState(() => DUMMY_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState({ open: false, mode: 'create', customer: null });

  // Filter list by search query
  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q))
    );
  });

  const handleSaveCustomer = (formData) => {
    if (modalState.mode === 'create') {
      const newCustomer = {
        id: 'c' + Date.now(),
        name: formData.name,
        email: formData.email || '',
        phone: formData.phone || '',
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      toast({
        title: "Guest added",
        description: `${newCustomer.name} has been registered successfully.`,
        duration: 2500,
      });
    } else {
      const updated = {
        ...modalState.customer,
        name: formData.name,
        email: formData.email || '',
        phone: formData.phone || '',
      };
      setCustomers((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      if (linkedCustomer?.id === updated.id) {
        linkCustomer(updated);
      }
      toast({
        title: "Guest updated",
        description: `${updated.name}'s profile has been updated.`,
        duration: 2500,
      });
    }
  };

  const handleDeleteCustomer = (customer) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
    if (linkedCustomer?.id === customer.id) {
      unlinkCustomer();
    }
    toast({
      title: "Guest removed",
      description: `${customer.name} has been deleted.`,
      variant: "destructive",
      duration: 2500,
    });
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-6 select-none bg-cafe-bg pb-12 w-full">
        {/* Page Header */}
        <div className="flex justify-between items-center select-none">
          <div>
            <h1 className="font-display font-bold text-2xl text-cafe-text-primary">
              Customers
            </h1>
            <p className="font-sans font-normal text-sm text-cafe-text-secondary mt-0.5">
              {customers.length} {customers.length === 1 ? 'guest' : 'guests'} registered
            </p>
          </div>

          <Button
            onClick={() => setModalState({ open: true, mode: 'create', customer: null })}
            className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg px-5 h-10 rounded-lg font-display font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UserPlus className="h-4 w-4 shrink-0 text-cafe-bg" />
            <span>Add Customer</span>
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#9A9590] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-[#242424] border border-[#2E2E2E] focus:border-cafe-accent focus:ring-2 focus:ring-cafe-accent/20 pl-11 pr-4 text-sm text-cafe-text-primary rounded-lg focus:outline-none transition-colors placeholder-[#9A9590]/50"
            />
          </div>

          {searchQuery && (
            <span className="font-sans font-normal text-xs text-[#9A9590] shrink-0">
              Showing {filteredCustomers.length} of {customers.length}
            </span>
          )}
        </div>

        {/* Customer Table List */}
        {filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center select-none">
            <UsersRound className="h-13 w-13 text-[#2E2E2E] mb-4 shrink-0" />
            <h3 className="font-display font-semibold text-lg text-[#9A9590]">
              {searchQuery ? 'No customers found' : 'No guests registered yet'}
            </h3>
            <p className="font-sans font-normal text-sm text-[#9A9590] mt-1 mb-4">
              {searchQuery ? 'Try a different name, email, or phone number' : 'Add guests to link them to orders'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setModalState({ open: true, mode: 'create', customer: null })}
                className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg px-5 h-10 rounded-lg font-display font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserPlus className="h-4 w-4 shrink-0 text-cafe-bg" />
                <span>Add Customer</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto w-full scrollbar-none">
            <table className="w-full border-collapse separate border-spacing-y-2.5 min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-[#2E2E2E]">
                  <th className="w-[48px] pb-2 pl-4"></th>
                  <th className="font-sans font-medium text-xs text-[#9A9590] uppercase tracking-wider pb-2">Name</th>
                  <th className="font-sans font-medium text-xs text-[#9A9590] uppercase tracking-wider pb-2">Email</th>
                  <th className="font-sans font-medium text-xs text-[#9A9590] uppercase tracking-wider pb-2 w-[150px]">Phone</th>
                  <th className="font-sans font-medium text-xs text-[#9A9590] uppercase tracking-wider pb-2 w-[100px]">Linked?</th>
                  <th className="font-sans font-medium text-xs text-[#9A9590] uppercase tracking-wider pb-2 w-[140px] text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filteredCustomers.map((customer) => {
                    const isLinked = linkedCustomer?.id === customer.id;
                    const colors = getAvatarColors(customer.name);
                    const firstLetter = (customer.name[0] || 'A').toUpperCase();

                    return (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -12, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#1A1A1A] border border-[#2E2E2E] hover:bg-[#242424] transition-colors duration-150 h-[60px]"
                      >
                        {/* Avatar */}
                        <td className="pl-4 first:rounded-l-xl last:rounded-r-xl w-[48px] select-none">
                          <div className={`h-[36px] w-[36px] rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0 ${colors.bg} ${colors.text}`}>
                            {firstLetter}
                          </div>
                        </td>

                        {/* Name */}
                        <td className="align-middle">
                          <div>
                            <h4 className="font-display font-semibold text-sm text-[#F0EDE8]">
                              {customer.name}
                            </h4>
                            <p className="font-sans font-normal text-[11px] text-[#9A9590] mt-0.5">
                              Returning guest
                            </p>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="align-middle min-w-[150px]">
                          <div className="flex items-center gap-1.5 text-sm text-[#9A9590] max-w-[200px]">
                            <Mail className="h-3.5 w-3.5 text-[#2E2E2E] shrink-0" />
                            <span className="truncate">{customer.email || '—'}</span>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="align-middle">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9A9590]">
                            <Phone className="h-3.5 w-3.5 text-[#2E2E2E] shrink-0" />
                            <span>{customer.phone || '—'}</span>
                          </div>
                        </td>

                        {/* Linked Status */}
                        <td className="align-middle">
                          {isLinked ? (
                            <span className="inline-flex items-center bg-[#3D2B00] border border-[#F5A623]/40 px-2.5 py-1 rounded-full shrink-0">
                              <LinkIcon className="h-3 w-3 text-cafe-accent shrink-0" />
                              <span className="font-sans font-semibold text-[11px] text-cafe-accent ml-1">
                                Linked
                              </span>
                            </span>
                          ) : (
                            <span className="font-sans font-normal text-sm text-[#2E2E2E] pl-2 select-none">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="text-right pr-4 first:rounded-l-xl last:rounded-r-xl align-middle">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Link / Unlink Button */}
                            {isLinked ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => {
                                      unlinkCustomer();
                                      toast({
                                        title: "Guest unlinked",
                                        description: "Removed guest from the current order.",
                                        duration: 2000,
                                      });
                                    }}
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#3D2B00] border border-[#F5A623] text-cafe-accent transition-colors cursor-pointer focus:outline-none"
                                  >
                                    <UserMinus className="h-[15px] w-[15px] shrink-0" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#1A1A1A] border-[#2E2E2E] text-[#F0EDE8] text-xs">
                                  Remove from order
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => {
                                      linkCustomer(customer);
                                      toast({
                                        title: `${customer.name} linked`,
                                        description: "They're now attached to the current order.",
                                        duration: 2500,
                                      });
                                    }}
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#242424] border border-[#2E2E2E] text-[#9A9590] hover:bg-[#3D2B00] hover:border-[#F5A623]/50 hover:text-cafe-accent transition-colors cursor-pointer focus:outline-none"
                                  >
                                    <UserCheck className="h-[15px] w-[15px] shrink-0" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#1A1A1A] border-[#2E2E2E] text-[#F0EDE8] text-xs">
                                  Link to current order
                                </TooltipContent>
                              </Tooltip>
                            )}

                            {/* Edit Button */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => setModalState({ open: true, mode: 'edit', customer })}
                                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#242424] border border-[#2E2E2E] text-[#9A9590] hover:border-[#F5A623] hover:text-cafe-accent transition-colors cursor-pointer focus:outline-none"
                                >
                                  <Pencil className="h-[15px] w-[15px] shrink-0" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#1A1A1A] border-[#2E2E2E] text-[#F0EDE8] text-xs">
                                Edit guest
                              </TooltipContent>
                            </Tooltip>

                            {/* Delete Button (with AlertDialog) */}
                            <AlertDialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#242424] border border-[#2E2E2E] text-[#9A9590] hover:bg-cafe-danger/10 hover:border-[#E05C5C] hover:text-[#E05C5C] transition-colors cursor-pointer focus:outline-none"
                                    >
                                      <Trash2 className="h-[15px] w-[15px] shrink-0" />
                                    </button>
                                  </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#1A1A1A] border-[#2E2E2E] text-[#F0EDE8] text-xs">
                                  Delete guest
                                </TooltipContent>
                              </Tooltip>
                              
                              <AlertDialogContent className="bg-cafe-surface-raised border border-cafe-border text-cafe-text-primary">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-display text-lg">
                                    Delete {customer.name}?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-cafe-text-secondary text-sm">
                                    This removes their record permanently. Any past orders linked to them are preserved.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-2">
                                  <AlertDialogCancel className="bg-cafe-surface border-cafe-border text-[#9A9590] hover:bg-cafe-surface-raised hover:text-[#F0EDE8] cursor-pointer rounded-lg font-sans font-medium text-sm">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteCustomer(customer)}
                                    className="bg-[#E05C5C] hover:bg-[#E05C5C]/90 text-white cursor-pointer rounded-lg font-display font-semibold text-sm"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Customer Form Modal */}
        <CustomerFormModal
          isOpen={modalState.open}
          onClose={() => setModalState({ open: false, mode: 'create', customer: null })}
          mode={modalState.mode}
          customer={modalState.customer}
          onSave={handleSaveCustomer}
        />
      </div>
    </TooltipProvider>
  );
};

export default CustomersView;
