import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Eye, Pencil, Trash2, ClipboardX } from 'lucide-react';
import { DUMMY_ORDERS } from '../data/dummyData';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import { formatINR, cn } from '../lib/utils';

import { Dialog, DialogContent, DialogTitle, DialogClose } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
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

export const OrdersView = ({ selectedOrderId, setSelectedOrderId }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Local state for orders (initialized from DUMMY_ORDERS so we can delete orders locally)
  const [orders, setOrders] = useState(() => DUMMY_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Draft' | 'Paid' | 'Cancelled'
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sync isDetailOpen with selectedOrderId prop from sidebar
  useEffect(() => {
    if (selectedOrderId) {
      setIsDetailOpen(true);
    }
  }, [selectedOrderId]);

  // Find selected order details
  const activeOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId);
  }, [selectedOrderId, orders]);

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrderId(null);
  };

  // Filter orders by search query & status select option
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        order.number.toLowerCase().includes(query) ||
        (order.customer ? order.customer.toLowerCase().includes(query) : 'walk-in'.includes(query)) ||
        order.date.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleEditOrder = (orderNumber) => {
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'Only administrators can modify order history.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Editing Loaded',
      description: `Order ${orderNumber} loaded for editing.`,
    });
    handleCloseDetail();
  };

  const handleDeleteOrder = (orderId, orderNumber) => {
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'Only administrators can delete orders.',
        variant: 'destructive',
      });
      return;
    }
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    toast({
      title: 'Order Deleted',
      description: `Order ${orderNumber} has been removed.`,
      variant: 'destructive',
    });
    handleCloseDetail();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="font-sans font-medium text-[11px] px-2.5 py-0.5 bg-cafe-success/15 border border-cafe-success/30 text-cafe-success rounded-full select-none shrink-0">
            Paid
          </span>
        );
      case 'Cancelled':
        return (
          <span className="font-sans font-medium text-[11px] px-2.5 py-0.5 bg-cafe-danger/15 border border-cafe-danger/30 text-cafe-danger rounded-full select-none shrink-0">
            Cancelled
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="font-sans font-medium text-[11px] px-2.5 py-0.5 bg-cafe-surface-raised border border-cafe-border text-cafe-text-secondary rounded-full select-none shrink-0">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 select-none bg-cafe-bg pb-12">
      {/* Page Header */}
      <div className="flex justify-between items-center select-none">
        <div>
          <h1 className="font-display font-bold text-2xl text-cafe-text-primary">
            Order History
          </h1>
          <p className="font-sans font-normal text-sm text-cafe-text-secondary mt-0.5">
            Current session &middot; {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        <Button
          onClick={() => alert('Exporting session report to Excel...')}
          className="bg-cafe-surface-raised border border-cafe-border hover:border-cafe-accent text-cafe-text-secondary hover:text-cafe-text-primary px-4 h-9 rounded-lg font-sans font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span>Export</span>
        </Button>
      </div>

      {/* Filter controls row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-cafe-text-secondary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by order #, customer, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-cafe-surface-raised border border-cafe-border focus:border-cafe-accent focus:ring-2 focus:ring-cafe-accent/20 pl-10 pr-4 text-sm text-cafe-text-primary rounded-lg focus:outline-none transition-colors"
          />
        </div>

        {/* Status Dropdown */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[140px] bg-cafe-surface-raised border-cafe-border text-cafe-text-primary text-xs h-10 rounded-lg">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-cafe-surface-raised border-cafe-border text-cafe-text-primary">
            <SelectItem value="all" className="text-xs cursor-pointer hover:bg-cafe-accent/10 focus:bg-cafe-accent focus:text-cafe-bg">All Status</SelectItem>
            <SelectItem value="Draft" className="text-xs cursor-pointer hover:bg-cafe-accent/10 focus:bg-cafe-accent focus:text-cafe-bg">Draft</SelectItem>
            <SelectItem value="Paid" className="text-xs cursor-pointer hover:bg-cafe-accent/10 focus:bg-cafe-accent focus:text-cafe-bg">Paid</SelectItem>
            <SelectItem value="Cancelled" className="text-xs cursor-pointer hover:bg-cafe-accent/10 focus:bg-cafe-accent focus:text-cafe-bg">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table Grid Area */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardX className="h-12 w-12 text-cafe-border mb-3 shrink-0" />
          <h3 className="font-display font-semibold text-base text-cafe-text-primary">
            No orders found
          </h3>
          <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full scrollbar-none">
          <table className="w-full border-collapse separate border-spacing-y-2.5 min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-cafe-border">
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3 pl-4">Order #</th>
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3">Customer</th>
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3">Date</th>
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3">Amount</th>
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3">Status</th>
                <th className="font-sans font-semibold text-[11px] text-cafe-text-secondary uppercase tracking-wider pb-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-cafe-surface border border-cafe-border hover:bg-cafe-surface-raised transition-colors duration-150 h-14 group"
                >
                  {/* Left rounded child */}
                  <td className="font-display font-semibold text-sm text-cafe-text-primary pl-4 first:rounded-l-xl last:rounded-r-xl">
                    {order.number}
                  </td>
                  <td className="font-sans font-normal text-sm text-cafe-text-secondary">
                    {order.customer ? (
                      order.customer
                    ) : (
                      <span className="text-cafe-text-secondary/50 italic font-normal text-xs">
                        Walk-in
                      </span>
                    )}
                  </td>
                  <td className="font-sans font-normal text-xs text-cafe-text-secondary">
                    {order.date}
                  </td>
                  <td className="price text-sm font-medium text-cafe-accent">
                    {formatINR(order.amount)}
                  </td>
                  <td className="align-middle">
                    {getStatusBadge(order.status)}
                  </td>
                  
                  {/* Right rounded child */}
                  <td className="text-right pr-4 first:rounded-l-xl last:rounded-r-xl">
                    <div className="inline-flex items-center gap-1.5">
                      {/* View Action */}
                      <button
                        onClick={() => setSelectedOrderId(order.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-cafe-text-secondary hover:text-cafe-text-primary hover:bg-cafe-surface-raised transition-colors focus:outline-none"
                        title="View details"
                      >
                        <Eye className="h-4 w-4 shrink-0" />
                      </button>

                      {/* Draft actions only (Admins only) */}
                      {order.status === 'Draft' && isAdmin && (
                        <>
                          {/* Edit Action */}
                          <button
                            onClick={() => handleEditOrder(order.number)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-cafe-accent hover:text-[#e09820] hover:bg-cafe-accent-dim transition-colors focus:outline-none"
                            title="Load for editing"
                          >
                            <Pencil className="h-3.5 w-3.5 shrink-0" />
                          </button>

                          {/* Delete Action Alert Trigger */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-cafe-danger hover:bg-cafe-danger/10 transition-colors focus:outline-none"
                                title="Delete order"
                              >
                                <Trash2 className="h-3.5 w-3.5 shrink-0" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-cafe-surface-raised border border-cafe-border text-cafe-text-primary">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-display text-lg">
                                  Delete order {order.number}?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-cafe-text-secondary text-sm">
                                  This action cannot be undone. This will permanently remove the order draft from the records.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel className="bg-cafe-surface border-cafe-border text-cafe-text-secondary hover:bg-cafe-surface-raised hover:text-cafe-text-primary cursor-pointer rounded-lg">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteOrder(order.id, order.number)}
                                  className="bg-cafe-danger hover:bg-cafe-danger/90 text-white cursor-pointer rounded-lg font-semibold"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={(open) => !open && handleCloseDetail()}>
        <DialogContent className="max-w-md w-full bg-cafe-surface border border-cafe-border p-6 rounded-2xl shadow-elevated focus-visible:outline-none flex flex-col gap-5">
          {activeOrder && (
            <>
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DialogTitle className="font-display font-bold text-lg text-cafe-text-primary">
                    Order {activeOrder.number}
                  </DialogTitle>
                  {getStatusBadge(activeOrder.status)}
                </div>
              </div>

              {/* Info grid details */}
              <div className="grid grid-cols-2 gap-4 bg-cafe-surface-raised p-4 border border-cafe-border/50 rounded-xl text-xs font-sans">
                <div className="space-y-1">
                  <span className="font-medium text-cafe-text-secondary uppercase tracking-wider block text-[10px]">
                    Customer
                  </span>
                  <span className="font-semibold text-cafe-text-primary block text-sm">
                    {activeOrder.customer || 'Walk-in'}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-cafe-text-secondary uppercase tracking-wider block text-[10px]">
                    Table
                  </span>
                  <span className="font-semibold text-cafe-text-primary block text-sm">
                    {activeOrder.table || '-'}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-cafe-text-secondary uppercase tracking-wider block text-[10px]">
                    Date
                  </span>
                  <span className="font-semibold text-cafe-text-primary block text-sm">
                    {activeOrder.date}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-cafe-text-secondary uppercase tracking-wider block text-[10px]">
                    Payment Mode
                  </span>
                  <span className="font-semibold text-cafe-text-primary block text-sm">
                    {activeOrder.payment || '-'}
                  </span>
                </div>
              </div>

              <Separator className="bg-cafe-border" />

              {/* Items Detail Section */}
              <div className="space-y-2.5">
                <h4 className="font-display font-semibold text-sm text-cafe-text-primary">
                  Items Purchased
                </h4>
                
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {activeOrder.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Dot in category color */}
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.categoryColor || '#F5A623' }}
                        />
                        <span className="font-sans font-medium text-cafe-text-primary truncate max-w-[160px]">
                          {item.name}
                        </span>
                        <span className="font-sans font-normal text-cafe-text-secondary">
                          &times; {item.qty}
                        </span>
                      </div>
                      <span className="price font-medium text-cafe-text-primary shrink-0">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-cafe-border" />

              {/* Totals pricing block */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-cafe-text-secondary font-medium">
                  <span>Subtotal</span>
                  <span className="price text-cafe-text-primary">{formatINR(activeOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-cafe-text-secondary font-medium">
                  <span>Tax</span>
                  <span className="price text-cafe-text-primary">{formatINR(activeOrder.tax)}</span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between items-center text-cafe-success font-medium">
                    <span>Discount</span>
                    <span className="price">-{formatINR(activeOrder.discount)}</span>
                  </div>
                )}
                
                <Separator className="bg-cafe-border my-2.5" />
                
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm text-cafe-text-primary">Total</span>
                  <span className="price text-base font-bold text-cafe-accent">
                    {formatINR(activeOrder.total)}
                  </span>
                </div>
              </div>

              {/* Modal footer controls */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-cafe-border select-none mt-2.5">
                {activeOrder.status === 'Draft' ? (
                  <>
                    {isAdmin ? (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              className="bg-transparent border border-cafe-danger/35 hover:bg-cafe-danger/10 text-cafe-danger px-4 h-9 rounded-lg font-sans font-semibold text-xs cursor-pointer"
                            >
                              Delete Order
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-cafe-surface-raised border border-cafe-border text-cafe-text-primary">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display text-lg">
                                Delete order {activeOrder.number}?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-cafe-text-secondary text-sm">
                                This action cannot be undone. This will permanently remove the order draft.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-2">
                              <AlertDialogCancel className="bg-cafe-surface border-cafe-border text-cafe-text-secondary hover:bg-cafe-surface-raised hover:text-cafe-text-primary cursor-pointer rounded-lg">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteOrder(activeOrder.id, activeOrder.number)}
                                className="bg-cafe-danger hover:bg-cafe-danger/90 text-white cursor-pointer rounded-lg font-semibold"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        
                        <Button
                          type="button"
                          onClick={() => handleEditOrder(activeOrder.number)}
                          className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg px-4.5 h-9 rounded-lg font-display font-bold text-xs cursor-pointer"
                        >
                          Edit Order
                        </Button>
                      </>
                    ) : (
                      <DialogClose asChild>
                        <Button
                          type="button"
                          onClick={handleCloseDetail}
                          className="bg-cafe-surface-raised border border-cafe-border hover:border-cafe-text-primary text-cafe-text-primary px-5 h-9 rounded-lg font-sans font-semibold text-xs cursor-pointer"
                        >
                          Close
                        </Button>
                      </DialogClose>
                    )}
                  </>
                ) : (
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleCloseDetail}
                      className="bg-cafe-surface-raised border border-cafe-border hover:border-cafe-text-primary text-cafe-text-primary px-5 h-9 rounded-lg font-sans font-semibold text-xs cursor-pointer"
                    >
                      Close
                    </Button>
                  </DialogClose>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default OrdersView;
