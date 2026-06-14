import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, Search, MapPin, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const TopNav = ({ searchQuery, setSearchQuery, showBack = false, selectedTableNumber = 'T-03' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-cafe-surface border-b border-cafe-border flex items-center justify-between px-6 select-none">
      {/* Left section: Logo or Back Button */}
      <div className="flex items-center gap-4">
        {showBack ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-cafe-text-secondary hover:text-cafe-text-primary transition-colors py-1.5 focus-visible:ring-2 focus-visible:ring-cafe-accent rounded"
            aria-label="Back to Menu"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-sans font-medium text-sm">Back to Menu</span>
          </button>
        ) : (
          <Link to="/dashboard" className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-cafe-accent rounded">
            <Coffee className="h-5 w-5 text-cafe-accent" />
            <span className="font-display font-bold text-base text-cafe-text-primary">Odoo Cafe POS</span>
          </Link>
        )}
      </div>

      {/* Center section: Search Bar (Hidden when showing Back, or hidden on mobile if too small) */}
      {!showBack && (
        <div className="flex-1 max-w-xs md:max-w-sm mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 pl-9 pr-4 h-9 text-sm text-cafe-text-primary rounded-md"
            />
          </div>
        </div>
      )}

      {/* Right section: Info badge + Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Table indicator */}
        <div className="flex items-center gap-1.5 bg-cafe-accent-dim px-3 py-1 rounded-full border border-cafe-accent/20 shadow-sm">
          <MapPin className="h-4 w-4 text-cafe-accent" />
          <span className="font-sans font-medium text-[13px] text-cafe-text-primary">{selectedTableNumber}</span>
        </div>

        <Separator orientation="vertical" className="bg-cafe-border h-6 hidden sm:block" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-accent rounded-full">
            <div className="h-9 w-9 rounded-full bg-cafe-accent hover:opacity-90 transition-opacity flex items-center justify-center font-display font-bold text-[13px] text-cafe-bg cursor-pointer">
              {user?.avatar || 'RM'}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-cafe-surface-raised border-cafe-border text-cafe-text-primary">
            <DropdownMenuLabel className="font-sans font-semibold text-sm text-cafe-text-primary px-3 py-2">
              <div className="font-medium text-xs text-cafe-text-secondary uppercase mb-0.5">Logged in as</div>
              {user?.name || 'Rohan Mehta'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-cafe-border" />
            <DropdownMenuItem disabled className="px-3 py-2 text-sm text-cafe-text-secondary cursor-not-allowed">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cafe-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="px-3 py-2 text-sm text-cafe-danger hover:bg-cafe-danger/10 hover:text-cafe-danger cursor-pointer flex items-center justify-between"
            >
              <span>Logout</span>
              <LogOut className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default TopNav;
