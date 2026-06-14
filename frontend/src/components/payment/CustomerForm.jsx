import React, { useState } from 'react';
import { User, LayoutGrid, ChevronDown, AlertCircle } from 'lucide-react';
import { FLOORS, DUMMY_ORDERS, DUMMY_CUSTOMERS } from '../../data/dummyData';
import { FormField, FormItem, FormLabel, FormControl } from '../ui/form';
import { Input } from '../ui/input';
import TablePickerModal from './TablePickerModal';

export const CustomerForm = ({ form }) => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // Sync initial state with form's tableId value
  const initialTableId = form.getValues('tableId');
  const [selectedTable, setSelectedTable] = useState(() => {
    if (!initialTableId) return null;
    for (const floor of FLOORS) {
      const table = floor.tables.find((t) => t.id === initialTableId);
      if (table) {
        return {
          ...table,
          floorId: floor.id,
          floorName: floor.name,
        };
      }
    }
    return null;
  });

  const handleTableConfirm = (committedTable) => {
    setSelectedTable(committedTable);
    form.setValue('tableId', committedTable?.id || '', { shouldValidate: true });

    if (committedTable?.occupied) {
      const matchingOrder = DUMMY_ORDERS.find((o) => o.table === committedTable.number);
      if (matchingOrder && matchingOrder.customer) {
        const cust = DUMMY_CUSTOMERS.find((c) => c.name === matchingOrder.customer);
        form.setValue('customerName', matchingOrder.customer, { shouldValidate: true });
        form.setValue('email', cust?.email || '', { shouldValidate: true });
        form.setValue('mobile', cust?.phone || '', { shouldValidate: true });
      }
    }
  };

  const hasTableError = !!form.formState.errors.tableId && !selectedTable;

  return (
    <div className="bg-cafe-surface border border-cafe-border rounded-xl p-6 space-y-5 select-none shadow-card">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cafe-border pb-3">
        <User className="h-4.5 w-4.5 text-cafe-accent" />
        <h3 className="font-display font-semibold text-base text-cafe-text-primary">
          Customer Details
        </h3>
      </div>

      <div className="space-y-4">
        {/* Table Selector Trigger Button (Full width row) */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-cafe-text-secondary block">
            Table <span className="text-cafe-danger">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsTableModalOpen(true)}
            className={`w-full h-11 px-4 bg-[#242424] border rounded-md flex items-center justify-between text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cafe-accent focus:ring-offset-2 focus:ring-offset-[#0F0F0F] cursor-pointer ${
              selectedTable
                ? 'border-cafe-accent'
                : hasTableError
                ? 'border-cafe-danger'
                : 'border-cafe-border hover:border-cafe-accent/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid
                className={`h-4 w-4 shrink-0 transition-colors ${
                  selectedTable ? 'text-cafe-accent' : 'text-cafe-text-secondary'
                }`}
              />
              {selectedTable ? (
                <span className="font-sans font-medium text-cafe-text-primary">
                  {selectedTable.number} &middot; {selectedTable.floorName} &middot; {selectedTable.seats} seats
                </span>
              ) : (
                <span className="font-sans font-normal text-cafe-text-secondary">
                  Select a table
                </span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-cafe-text-secondary shrink-0" />
          </button>

          {/* Validation Error Message */}
          {hasTableError && (
            <div className="flex items-center gap-1.5 mt-1.5 text-cafe-danger">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="font-sans font-normal text-xs leading-none">
                Please select a table
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[13px] font-medium text-cafe-text-secondary">
                Customer Name <span className="text-cafe-danger">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Priya Sharma"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary text-sm rounded-md"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[13px] font-medium text-cafe-text-secondary">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="priya@email.com"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary text-sm rounded-md"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Mobile Number (Full width row) */}
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[13px] font-medium text-cafe-text-secondary">
                Mobile Number
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary text-sm rounded-md"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Modal Dialog */}
      <TablePickerModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        selectedTable={selectedTable}
        onConfirm={handleTableConfirm}
      />
    </div>
  );
};
export default CustomerForm;
