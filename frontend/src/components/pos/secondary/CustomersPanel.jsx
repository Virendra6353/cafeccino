import React, { useState } from 'react';
import { UserCheck, UserX, X, Search, Link as LinkIcon, CheckCircle2, UserPlus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../hooks/use-toast';
import { DUMMY_CUSTOMERS } from '../../../data/dummyData';
import CustomerFormModal from '../../payment/CustomerFormModal';

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

export const CustomersPanel = () => {
  const { toast } = useToast();
  const { linkedCustomer, linkCustomer, unlinkCustomer } = useCart();

  const [customers, setCustomers] = useState(() => DUMMY_CUSTOMERS);
  const [quickSearch, setQuickSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter local customers list based on quick search
  const filteredCustomers = customers.filter((customer) => {
    const q = quickSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      customer.name.toLowerCase().includes(q) ||
      (customer.email && customer.email.toLowerCase().includes(q)) ||
      (customer.phone && customer.phone.includes(q))
    );
  });

  const handleRowClick = (customer) => {
    linkCustomer(customer);
    toast({
      title: `${customer.name} linked`,
      description: "They're now attached to the current order.",
      duration: 2500,
    });
  };

  const handleAddCustomer = (newCustomerData) => {
    const newCustomer = {
      id: 'c' + Date.now(),
      name: newCustomerData.name,
      email: newCustomerData.email || '',
      phone: newCustomerData.phone || '',
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    linkCustomer(newCustomer);

    toast({
      title: `${newCustomer.name} added`,
      description: "Guest added and linked to order.",
      duration: 2500,
    });
  };

  return (
    <div className="flex flex-col h-full bg-cafe-surface select-none">
      {/* Panel Header */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <h3 className="font-display font-bold text-[15px] text-[#F0EDE8] tracking-wide">
          Customers
        </h3>
        <p className="font-sans font-normal text-xs text-[#9A9590] mt-0.5">
          Guest management
        </p>
      </div>

      {/* Linked Customer Card Area */}
      <div className="shrink-0">
        {linkedCustomer ? (
          <div className="mx-3 mb-3 bg-[#3D2B00] border border-[#F5A623]/40 rounded-xl p-3 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <UserCheck className="h-3.5 w-3.5 text-cafe-accent shrink-0" />
                <span className="font-sans font-medium text-[11px] text-cafe-accent ml-1.5">
                  Linked to order
                </span>
              </div>
              <button
                onClick={() => {
                  unlinkCustomer();
                  toast({
                    title: "Guest unlinked",
                    description: "Removed guest from the current order.",
                    duration: 2000,
                  });
                }}
                className="text-cafe-accent hover:opacity-75 transition-opacity p-0.5 rounded focus:outline-none"
                title="Unlink customer"
              >
                <X className="h-3 w-3 shrink-0" />
              </button>
            </div>

            <div className="mt-2 min-w-0">
              <h4 className="font-display font-semibold text-sm text-[#F0EDE8] truncate">
                {linkedCustomer.name}
              </h4>
              {linkedCustomer.email && (
                <p className="font-sans font-normal text-[11px] text-[#F5A623]/70 mt-0.5 truncate">
                  {linkedCustomer.email}
                </p>
              )}
              {linkedCustomer.phone && (
                <p className="font-sans font-normal text-[11px] text-[#F5A623]/70 mt-0.5">
                  {linkedCustomer.phone}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-3 mb-3 bg-[#242424] border border-dashed border-[#2E2E2E] rounded-xl p-3 text-center">
            <UserX className="h-5 w-5 text-[#2E2E2E] mx-auto mb-1 shrink-0" />
            <p className="font-sans font-medium text-xs text-[#9A9590]">
              No guest linked
            </p>
            <p className="font-sans font-normal text-[11px] text-[#9A9590] mt-0.5">
              Link one from the list
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#2E2E2E] my-1 shrink-0" />

      {/* Quick Search */}
      <div className="px-3 pb-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9A9590] pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full pl-8 pr-3 h-[34px] bg-[#242424] border border-[#2E2E2E] focus:border-cafe-accent focus:ring-1 focus:ring-cafe-accent/20 text-xs text-cafe-text-primary rounded-md focus:outline-none transition-colors font-sans placeholder-[#9A9590]/50"
          />
        </div>
      </div>

      {/* Mini Customer List */}
      <div className="flex-1 overflow-y-auto px-2 gap-1 pb-[70px]">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#9A9590]/60 italic">
            No matches found
          </div>
        ) : (
          filteredCustomers.map((customer) => {
            const isLinked = linkedCustomer?.id === customer.id;
            const colors = getAvatarColors(customer.name);
            const firstLetter = (customer.name[0] || 'A').toUpperCase();

            return (
              <div
                key={customer.id}
                onClick={() => handleRowClick(customer)}
                className="px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#242424] flex items-center gap-2.5 group transition-colors select-none"
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-display font-bold text-[13px] shrink-0 ${colors.bg} ${colors.text}`}>
                  {firstLetter}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-medium text-[13px] text-[#F0EDE8] truncate">
                    {customer.name}
                  </p>
                  {customer.phone && (
                    <p className="font-sans font-normal text-[11px] text-[#9A9590] truncate mt-0.5">
                      {customer.phone}
                    </p>
                  )}
                </div>

                {/* Status Indicator / Hover Link Icon */}
                <div className="shrink-0">
                  {isLinked ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-cafe-accent" />
                  ) : (
                    <LinkIcon className="h-3.5 w-3.5 text-[#9A9590] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Customer Form Modal */}
      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
        onSave={handleAddCustomer}
      />
    </div>
  );
};

export default CustomersPanel;
