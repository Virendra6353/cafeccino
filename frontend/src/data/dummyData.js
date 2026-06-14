export const DUMMY_USER = {
  name: 'Rohan Mehta',
  email: 'rohan@odoo-cafe.com',
  role: 'cashier',
  avatar: 'RM',
};

export const CATEGORIES = [
  { id: 'all', name: 'All', color: '#F0EDE8' },
  { id: 'bev', name: 'Beverages', color: '#6C63FF' },
  { id: 'snk', name: 'Snacks', color: '#FF6584' },
  { id: 'mns', name: 'Mains', color: '#43CFAB' },
  { id: 'dss', name: 'Desserts', color: '#F5A623' },
  { id: 'spl', name: 'Specials', color: '#56CCF2' },
];

export const PRODUCTS = [
  { id: 'p1',  name: 'Cappuccino',       category: 'bev', price: 180, tax: 5,  unit: 'per cup',   description: 'Rich espresso with steamed milk foam' },
  { id: 'p2',  name: 'Cold Brew',        category: 'bev', price: 220, tax: 5,  unit: 'per cup',   description: 'Slow-steeped for 12 hours, served over ice' },
  { id: 'p3',  name: 'Masala Chai',      category: 'bev', price: 120, tax: 5,  unit: 'per cup',   description: 'Classic spiced tea with ginger and cardamom' },
  { id: 'p4',  name: 'Fresh Lime Soda',  category: 'bev', price: 100, tax: 5,  unit: 'per glass', description: 'Refreshing lime with soda and mint' },
  { id: 'p5',  name: 'Avocado Toast',    category: 'snk', price: 320, tax: 12, unit: 'per piece', description: 'Multigrain toast with smashed avocado and chili flakes' },
  { id: 'p6',  name: 'Bruschetta',       category: 'snk', price: 280, tax: 12, unit: 'per piece', description: 'Toasted sourdough with tomato and basil' },
  { id: 'p7',  name: 'Nachos',           category: 'snk', price: 250, tax: 12, unit: 'per plate', description: 'Tortilla chips with salsa and sour cream' },
  { id: 'p8',  name: 'Grilled Sandwich', category: 'mns', price: 290, tax: 12, unit: 'per piece', description: 'Cheese and veggie on butter-grilled bread' },
  { id: 'p9',  name: 'Pasta Arrabbiata',category: 'mns', price: 380, tax: 12, unit: 'per plate', description: 'Penne in spicy tomato sauce with garlic' },
  { id: 'p10', name: 'Paneer Wrap',      category: 'mns', price: 340, tax: 12, unit: 'per piece', description: 'Grilled paneer tikka with mint chutney in a whole wheat wrap' },
  { id: 'p11', name: 'Brownie',          category: 'dss', price: 160, tax: 5,  unit: 'per piece', description: 'Warm chocolate brownie served with vanilla scoop' },
  { id: 'p12', name: 'Cheesecake',       category: 'dss', price: 240, tax: 5,  unit: 'per slice', description: 'New York style with berry coulis' },
  { id: 'p13', name: 'Affogato',         category: 'dss', price: 200, tax: 5,  unit: 'per cup',   description: 'Vanilla gelato drowned in hot espresso' },
  { id: 'p14', name: 'Chef\'s Special',  category: 'spl', price: 450, tax: 12, unit: 'per plate', description: 'Daily rotating chef creation — ask your server' },
  { id: 'p15', name: 'Combo Meal',       category: 'spl', price: 520, tax: 12, unit: 'per set',   description: 'Any main + beverage + dessert at a flat rate' },
];

export const FLOORS = [
  {
    id: 'f1',
    name: 'Ground Floor',
    tables: [
      { id: 't1', number: 'T-01', seats: 4, active: true,  occupied: true,  occupiedSince: '1:52 PM' },
      { id: 't2', number: 'T-02', seats: 2, active: true,  occupied: false, occupiedSince: null },
      { id: 't3', number: 'T-03', seats: 6, active: true,  occupied: false, occupiedSince: null },
      { id: 't4', number: 'T-04', seats: 4, active: true,  occupied: true,  occupiedSince: '12:10 PM' },
      { id: 't5', number: 'T-05', seats: 2, active: false, occupied: false, occupiedSince: null },
    ],
  },
  {
    id: 'f2',
    name: 'First Floor',
    tables: [
      { id: 't6', number: 'T-06', seats: 8, active: true,  occupied: false, occupiedSince: null },
      { id: 't7', number: 'T-07', seats: 4, active: true,  occupied: true,  occupiedSince: '1:30 PM' },
      { id: 't8', number: 'T-08', seats: 6, active: true,  occupied: false, occupiedSince: null },
    ],
  },
  {
    id: 'f3',
    name: 'Terrace',
    tables: [
      { id: 't9',  number: 'T-09', seats: 4, active: true,  occupied: false, occupiedSince: null },
      { id: 't10', number: 'T-10', seats: 2, active: true,  occupied: false, occupiedSince: null },
      { id: 't11', number: 'T-11', seats: 6, active: true,  occupied: true,  occupiedSince: '12:47 PM' },
    ],
  },
];

export const COUPONS = [
  { code: 'WELCOME10', type: 'percentage', value: 10, description: '10% off your order' },
  { code: 'FLAT50',    type: 'fixed',      value: 50, description: '₹50 off your order' },
  { code: 'CAFE20',    type: 'percentage', value: 20, description: '20% off for members' },
];

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash',    icon: 'Banknote',    enabled: true },
  { id: 'card', label: 'Card',    icon: 'CreditCard',  enabled: true },
  { id: 'upi',  label: 'UPI',     icon: 'QrCode',      enabled: true },
];

export const UPI_ID = 'odaocafe@ybl';

export const DUMMY_ORDERS = [
  {
    id: 'ord-041',
    number: '#ORD-0041',
    customer: 'Priya Sharma',
    date: 'Today, 2:14 PM',
    amount: 780,
    status: 'Paid',
    table: 'T-03',
    payment: 'UPI',
    items: [
      { productId: 'p1', name: 'Cappuccino',    qty: 2, price: 180, categoryColor: '#6C63FF' },
      { productId: 'p9', name: 'Pasta Arrabbiata', qty: 1, price: 380, categoryColor: '#43CFAB' },
    ],
    subtotal: 740, tax: 62, discount: 0, total: 802,
  },
  {
    id: 'ord-040',
    number: '#ORD-0040',
    customer: 'Aarav Mehta',
    date: 'Today, 1:52 PM',
    amount: 520,
    status: 'Paid',
    table: 'T-01',
    payment: 'Cash',
    items: [
      { productId: 'p3', name: 'Masala Chai', qty: 3, price: 120, categoryColor: '#6C63FF' },
      { productId: 'p5', name: 'Avocado Toast', qty: 1, price: 320, categoryColor: '#FF6584' },
    ],
    subtotal: 680, tax: 54, discount: 50, total: 684,
  },
  {
    id: 'ord-039',
    number: '#ORD-0039',
    customer: null,
    date: 'Today, 1:30 PM',
    amount: 340,
    status: 'Draft',
    table: 'T-07',
    payment: null,
    items: [
      { productId: 'p10', name: 'Paneer Wrap', qty: 1, price: 340, categoryColor: '#43CFAB' },
    ],
    subtotal: 340, tax: 41, discount: 0, total: 381,
  },
  {
    id: 'ord-038',
    number: '#ORD-0038',
    customer: 'Sneha Joshi',
    date: 'Today, 12:47 PM',
    amount: 960,
    status: 'Paid',
    table: 'T-11',
    payment: 'Card',
    items: [
      { productId: 'p15', name: 'Combo Meal',  qty: 1, price: 520, categoryColor: '#56CCF2' },
      { productId: 'p12', name: 'Cheesecake',  qty: 1, price: 240, categoryColor: '#F5A623' },
      { productId: 'p2',  name: 'Cold Brew',   qty: 1, price: 220, categoryColor: '#6C63FF' },
    ],
    subtotal: 980, tax: 89, discount: 98, total: 971,
  },
  {
    id: 'ord-037',
    number: '#ORD-0037',
    customer: 'Rahul Nair',
    date: 'Today, 12:10 PM',
    amount: 200,
    status: 'Cancelled',
    table: 'T-04',
    payment: null,
    items: [
      { productId: 'p13', name: 'Affogato', qty: 1, price: 200, categoryColor: '#F5A623' },
    ],
    subtotal: 200, tax: 10, discount: 0, total: 210,
  },
  {
    id: 'ord-036',
    number: '#ORD-0036',
    customer: 'Divya Pillai',
    date: 'Today, 11:58 AM',
    amount: 450,
    status: 'Draft',
    table: 'T-02',
    payment: null,
    items: [
      { productId: 'p14', name: "Chef's Special", qty: 1, price: 450, categoryColor: '#56CCF2' },
    ],
    subtotal: 450, tax: 54, discount: 0, total: 504,
  },
];

export const DUMMY_CUSTOMERS = [
  { id: 'c1', name: 'Priya Sharma',   email: 'priya@gmail.com',       phone: '9876543210' },
  { id: 'c2', name: 'Aarav Mehta',    email: 'aarav.mehta@outlook.com', phone: '9823001122' },
  { id: 'c3', name: 'Sneha Joshi',    email: 'sneha.j@yahoo.com',     phone: '9912345678' },
  { id: 'c4', name: 'Rahul Nair',     email: 'rahulnair@gmail.com',   phone: '9700112233' },
  { id: 'c5', name: 'Divya Pillai',   email: 'divya.p@icloud.com',    phone: '9654321098' },
  { id: 'c6', name: 'Karan Verma',    email: 'karan.verma@gmail.com', phone: '9988776655' },
  { id: 'c7', name: 'Ananya Singh',   email: 'ananya.s@gmail.com',    phone: '9871234560' },
];
