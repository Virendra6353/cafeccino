import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Armchair, CheckCircle2, MapPin, Check, X, TableProperties } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { FLOORS } from '../../data/dummyData';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';

export const TablePickerModal = ({ isOpen, onClose, selectedTable, onConfirm }) => {
  const [activeFloorId, setActiveFloorId] = useState('f1');
  const [tempSelectedTable, setTempSelectedTable] = useState(null);

  // Sync temporary state with actual selection whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelectedTable(selectedTable);
      // Auto-focus on the floor that has the selected table
      if (selectedTable?.floorId) {
        setActiveFloorId(selectedTable.floorId);
      } else {
        setActiveFloorId('f1');
      }
    }
  }, [isOpen, selectedTable]);

  // Find active floor & tables
  const activeFloor = FLOORS.find((f) => f.id === activeFloorId);
  const floorTables = activeFloor ? activeFloor.tables.filter((t) => t.active) : [];

  const handleTableClick = (table) => {
    if (table.occupied) return;

    if (tempSelectedTable?.id === table.id) {
      // Toggle off if clicked again
      setTempSelectedTable(null);
    } else {
      setTempSelectedTable({
        id: table.id,
        number: table.number,
        seats: table.seats,
        floorId: activeFloorId,
        floorName: activeFloor.name,
      });
    }
  };

  const handleConfirm = () => {
    onConfirm(tempSelectedTable);
    onClose();
  };

  // Find floor for the temporarily selected table
  const tempSelectedFloorName = tempSelectedTable?.floorName;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideClose={true}
        className="max-w-2xl w-full bg-cafe-surface border border-cafe-border rounded-2xl p-0 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.7)] flex flex-col max-h-[80vh] focus-visible:outline-none"
      >
        <VisuallyHidden.Root>
          <DialogTitle>Select a Table</DialogTitle>
        </VisuallyHidden.Root>

        {/* Modal Entry Animation wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex flex-col h-full w-full overflow-hidden"
        >
          {/* Modal Header */}
          <div className="h-[60px] px-6 bg-cafe-surface border-b border-cafe-border flex items-center justify-between shrink-0 select-none">
            {/* Left brand details */}
            <div className="flex items-center">
              <LayoutGrid className="h-4.5 w-4.5 text-cafe-accent" />
              <h2 className="font-display font-semibold text-[17px] text-cafe-text-primary ml-2">
                Select a Table
              </h2>
            </div>

            {/* Right details & close trigger */}
            <div className="flex items-center gap-4">
              {/* Legends */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-xs font-sans text-cafe-text-secondary">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-cafe-accent mr-1.5 shrink-0" />
                  <span>Occupied</span>
                </div>
                <div className="flex items-center text-xs font-sans text-cafe-text-secondary">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#3A3A3A] mr-1.5 shrink-0" />
                  <span>Available</span>
                </div>
              </div>

              {/* Separator */}
              <div className="w-[1px] h-5 bg-cafe-border" />

              {/* Close X */}
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-cafe-text-secondary hover:text-cafe-text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cafe-text-primary rounded"
                  aria-label="Close modal"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </DialogClose>
            </div>
          </div>

          {/* Floor Tab Bar */}
          <div className="h-12 px-6 bg-cafe-surface border-b border-cafe-border flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none select-none">
            {FLOORS.map((floor) => {
              const isActive = activeFloorId === floor.id;
              return (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() => setActiveFloorId(floor.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    isActive
                      ? 'bg-cafe-accent-dim text-cafe-accent border border-cafe-accent shadow-sm'
                      : 'bg-transparent text-cafe-text-secondary hover:text-cafe-text-primary border border-transparent hover:border-cafe-border'
                  }`}
                >
                  {floor.name}
                </button>
              );
            })}
          </div>

          {/* Table Grid scrollable body */}
          <div className="flex-1 overflow-y-auto p-6 bg-cafe-bg select-none">
            {floorTables.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <TableProperties className="h-9 w-9 text-cafe-border mb-2.5 shrink-0" />
                <h3 className="font-display font-semibold text-sm text-cafe-text-secondary">
                  No tables on this floor
                </h3>
                <p className="font-sans font-normal text-xs text-cafe-text-secondary/60 mt-1">
                  Add tables in Floor Plan settings
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {floorTables.map((table) => {
                  const isOccupied = table.occupied;
                  const isSelected = tempSelectedTable?.id === table.id;

                  // Determine state rendering styles
                  let cardStyle = '';
                  let accentColor = '';
                  let textStyle = '';
                  let descStyle = '';

                  if (isOccupied) {
                    cardStyle = 'bg-[#2A1F00] border-cafe-accent/35 text-cafe-accent cursor-not-allowed';
                    accentColor = '#F5A623';
                    textStyle = 'text-cafe-accent';
                    descStyle = 'text-cafe-accent/70';
                  } else if (isSelected) {
                    cardStyle = 'bg-cafe-accent-dim border-cafe-accent text-cafe-accent shadow-[0_0_16px_rgba(245,166,35,0.3)] relative';
                    accentColor = '#F5A623';
                    textStyle = 'text-cafe-accent';
                    descStyle = 'text-cafe-accent';
                  } else {
                    cardStyle = 'bg-cafe-surface-raised border-cafe-border text-cafe-text-primary hover:bg-[#2A2A2A]';
                    accentColor = '#3A3A3A';
                    textStyle = 'text-cafe-text-primary';
                    descStyle = 'text-cafe-text-secondary';
                  }

                  return (
                    <motion.div
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      whileHover={isOccupied ? {} : { scale: 1.04 }}
                      transition={{ duration: 0.15 }}
                      className={`aspect-square min-w-0 rounded-xl border p-3 flex flex-col items-center justify-center gap-1.5 transition-colors select-none ${cardStyle}`}
                      style={{
                        cursor: isOccupied ? 'not-allowed' : 'pointer',
                        borderColor: isSelected ? '#F5A623' : undefined,
                      }}
                    >
                      {/* Top Accent Bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-colors"
                        style={{
                          backgroundColor: isSelected ? '#F5A623' : accentColor,
                        }}
                      />

                      {/* Selected Badge */}
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 text-cafe-accent absolute top-2 right-2 pointer-events-none" />
                      )}

                      {/* Content details */}
                      <Armchair
                        className="h-6 w-6 transition-colors"
                        style={{ color: isSelected || isOccupied ? '#F5A623' : '#9A9590' }}
                      />
                      
                      <span className={`font-display font-bold text-sm ${textStyle}`}>
                        {table.number}
                      </span>
                      
                      <span className={`font-sans font-normal text-[11px] ${descStyle}`}>
                        {table.seats} seats
                      </span>

                      {isOccupied && (
                        <span className="font-sans font-medium text-[10px] bg-cafe-accent-dim text-cafe-accent px-2 py-0.5 rounded-full select-none mt-1">
                          Occupied
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="h-16 px-6 bg-cafe-surface border-t border-cafe-border flex items-center justify-between shrink-0 select-none">
            {/* Left selection display */}
            <div className="flex items-center text-sm font-sans">
              {tempSelectedTable ? (
                <>
                  <MapPin className="h-3.5 w-3.5 text-cafe-accent mr-1.5 shrink-0" />
                  <span className="font-medium text-cafe-text-primary">
                    {tempSelectedTable.number} &middot; {tempSelectedFloorName}
                  </span>
                </>
              ) : (
                <span className="font-normal text-cafe-text-secondary">
                  No table selected
                </span>
              )}
            </div>

            {/* Right actions trigger buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={onClose}
                className="bg-cafe-surface-raised border border-cafe-border text-cafe-text-secondary hover:text-cafe-text-primary px-4 h-9 rounded-lg font-sans font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={!tempSelectedTable}
                className="bg-cafe-accent hover:bg-[#e09820] text-cafe-bg px-5 h-9 rounded-lg font-display font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Check className="h-3.5 w-3.5 shrink-0" />
                <span>Confirm Table</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
export default TablePickerModal;
