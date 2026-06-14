import React from 'react';
import { FLOORS } from '../../../data/dummyData';
import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';

export const TableInfoPanel = ({ activeFloorId, setActiveFloorId }) => {
  const activeFloor = FLOORS.find((f) => f.id === activeFloorId) || FLOORS[0];
  const floorTables = activeFloor ? activeFloor.tables.filter((t) => t.active) : [];

  // Count occupied vs available for the active floor
  const occupiedCount = floorTables.filter((t) => t.occupied).length;
  const availableCount = floorTables.filter((t) => !t.occupied).length;

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header Area */}
      <div className="px-4 pt-5 pb-3">
        <h3 className="font-display font-bold text-[15px] text-cafe-text-primary">
          Tables
        </h3>
        <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-0.5">
          Live occupancy
        </p>
      </div>

      {/* Floor Tab Strip */}
      <div className="px-3 pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {FLOORS.map((floor) => {
          const isActive = activeFloorId === floor.id;
          return (
            <button
              key={floor.id}
              type="button"
              onClick={() => setActiveFloorId(floor.id)}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-sans font-semibold border transition-all cursor-pointer whitespace-nowrap",
                isActive
                  ? "bg-cafe-accent-dim text-cafe-accent border-cafe-accent shadow-sm"
                  : "bg-transparent border-transparent text-cafe-text-secondary hover:border-cafe-border hover:text-cafe-text-primary"
              )}
            >
              {floor.name}
            </button>
          );
        })}
      </div>

      <Separator className="bg-cafe-border mb-3" />

      {/* Mini Table Grid */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="grid grid-cols-2 gap-2">
          {floorTables.map((table) => {
            const isOccupied = table.occupied;

            return (
              <div
                key={table.id}
                className={cn(
                  "aspect-square rounded-lg p-2 flex flex-col items-center justify-center gap-0.5 relative transition-colors border",
                  isOccupied
                    ? "bg-[#2A1F00] border-cafe-accent/40 text-cafe-accent select-none"
                    : "bg-cafe-surface-raised border-cafe-border text-cafe-text-primary"
                )}
              >
                {/* Occupied Top Accent line */}
                {isOccupied && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-cafe-accent rounded-t-lg" />
                )}

                <span
                  className={cn(
                    "font-display font-bold text-[11px] leading-tight",
                    isOccupied ? "text-cafe-accent" : "text-cafe-text-primary"
                  )}
                >
                  {table.number}
                </span>

                <span
                  className={cn(
                    "font-sans font-normal text-[9px] scale-[0.9]",
                    isOccupied ? "text-cafe-accent/75" : "text-cafe-text-secondary"
                  )}
                >
                  {table.seats} seats
                </span>

                {/* Busy dot */}
                {isOccupied && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cafe-accent mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom occupancy summary */}
      <div className="border-t border-cafe-border px-4 py-3 bg-cafe-surface shrink-0">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-medium text-cafe-text-secondary">Available</span>
            <span className="font-mono font-bold text-cafe-success bg-cafe-success/15 px-1.5 py-0.5 rounded text-[10px]">
              {availableCount}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-medium text-cafe-text-secondary">Occupied</span>
            <span className="font-mono font-bold text-cafe-accent bg-cafe-accent-dim px-1.5 py-0.5 rounded text-[10px]">
              {occupiedCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableInfoPanel;
