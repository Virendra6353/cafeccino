import React, { useState } from 'react';
import { Armchair, TableProperties, UserX } from 'lucide-react';
import { FLOORS } from '../data/dummyData';
import { cn } from '../lib/utils';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

export const TableInfoView = ({ activeFloorId, setActiveFloorId }) => {
  const { toast } = useToast();
  const [floorsState, setFloorsState] = useState(() => FLOORS);
  const [selectedTableId, setSelectedTableId] = useState(null);

  const activeFloor = floorsState.find((f) => f.id === activeFloorId) || floorsState[0];
  const floorTables = activeFloor ? activeFloor.tables.filter((t) => t.active) : [];

  // Count occupied vs available for the active floor
  const occupiedCount = floorTables.filter((t) => t.occupied).length;
  const availableCount = floorTables.filter((t) => !t.occupied).length;

  const selectedTable = floorTables.find((t) => t.id === selectedTableId);

  const handleFloorChange = (floorId) => {
    setActiveFloorId(floorId);
    setSelectedTableId(null);
  };

  const handleMakeEmpty = () => {
    if (!selectedTable) return;

    setFloorsState((prevFloors) =>
      prevFloors.map((floor) => {
        if (floor.id !== activeFloorId) return floor;
        return {
          ...floor,
          tables: floor.tables.map((table) => {
            if (table.id !== selectedTableId) return table;
            return {
              ...table,
              occupied: false,
              occupiedSince: null,
            };
          }),
        };
      })
    );

    toast({
      title: "Table released",
      description: `Table ${selectedTable.number} is now marked as available.`,
      duration: 2500,
    });

    setSelectedTableId(null);
  };

  return (
    <div className="space-y-6 select-none bg-cafe-bg pb-12">
      {/* Page Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 select-none">
        <div>
          <h1 className="font-display font-bold text-2xl text-cafe-text-primary">
            Table Occupancy
          </h1>
          <p className="font-sans font-normal text-sm text-cafe-text-secondary mt-0.5">
            Live floor view &middot; {activeFloor.name}
          </p>
        </div>

        {/* Action Panel / Stats Row */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Make Empty Button */}
          {selectedTable && selectedTable.occupied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={handleMakeEmpty}
                className="w-full sm:w-auto bg-transparent border border-cafe-danger/40 hover:bg-cafe-danger/10 text-cafe-danger px-4 h-9 rounded-lg font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:outline-none"
              >
                <UserX className="h-4 w-4 shrink-0" />
                <span>Make {selectedTable.number} Empty</span>
              </button>
            </motion.div>
          )}

          {/* Stats Indicators */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial text-center bg-cafe-surface border border-cafe-border px-4 py-1.5 rounded-full flex items-center justify-center gap-2">
              <span className="font-sans font-medium text-xs text-cafe-text-secondary">Available:</span>
              <span className="font-mono font-bold text-cafe-success text-sm">{availableCount}</span>
            </div>
            <div className="flex-1 sm:flex-initial text-center bg-[#2A1F00] border border-cafe-accent/35 px-4 py-1.5 rounded-full flex items-center justify-center gap-2">
              <span className="font-sans font-medium text-xs text-cafe-text-secondary">Occupied:</span>
              <span className="font-mono font-bold text-cafe-accent text-sm">{occupiedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-cafe-border/50 pb-4">
        {floorsState.map((floor) => {
          const isActive = activeFloorId === floor.id;
          return (
            <button
              key={floor.id}
              type="button"
              onClick={() => handleFloorChange(floor.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-sans font-semibold border transition-all cursor-pointer whitespace-nowrap",
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

      {/* Tables Grid Layout */}
      {floorTables.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <TableProperties className="h-12 w-12 text-cafe-border mb-3 shrink-0" />
          <h3 className="font-display font-semibold text-base text-cafe-text-primary">
            No tables on this floor
          </h3>
          <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-1">
            Add tables in Floor Plan settings
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {floorTables.map((table) => {
            const isOccupied = table.occupied;
            const isSelected = selectedTableId === table.id;

            // Determine border and bg colors
            let cardStyle = '';
            let accentColor = '';
            let textStyle = '';
            let descStyle = '';

            if (isOccupied) {
              cardStyle = 'bg-[#2A1F00] border-cafe-accent/35 text-cafe-accent';
              accentColor = '#F5A623';
              textStyle = 'text-cafe-accent';
              descStyle = 'text-cafe-accent/70';
            } else {
              cardStyle = 'bg-cafe-surface border-cafe-border text-cafe-text-primary';
              accentColor = '#3A3A3A';
              textStyle = 'text-cafe-text-primary';
              descStyle = 'text-cafe-text-secondary';
            }

            return (
              <div
                key={table.id}
                onClick={() => setSelectedTableId(isSelected ? null : table.id)}
                className={cn(
                  "aspect-square rounded-xl border p-4 flex flex-col items-center justify-center gap-1.5 relative select-none cursor-pointer transition-all hover:border-cafe-accent/40",
                  cardStyle,
                  isSelected && "ring-2 ring-cafe-accent border-cafe-accent shadow-[0_0_12px_rgba(245,166,35,0.4)] scale-[1.02]"
                )}
              >
                {/* Top Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                  style={{ backgroundColor: isSelected ? '#F5A623' : accentColor }}
                />

                <Armchair
                  className="h-6 w-6 transition-colors"
                  style={{ color: isSelected || isOccupied ? '#F5A623' : '#9A9590' }}
                />

                <span className={`font-display font-bold text-sm ${textStyle}`}>
                  {table.number}
                </span>

                <span className={`font-sans font-normal text-xs ${descStyle}`}>
                  {table.seats} seats
                </span>

                {isOccupied && (
                  <>
                    <span className="font-sans font-medium text-[10px] bg-cafe-accent-dim text-cafe-accent px-2 py-0.5 rounded-full select-none mt-1">
                      Occupied
                    </span>
                    {table.occupiedSince && (
                      <span className="font-sans font-normal text-[9px] text-cafe-accent/60 mt-0.5">
                        Since {table.occupiedSince}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend display row below the grid */}
      <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs font-sans">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#3A3A3A] shrink-0" />
          <span className="text-cafe-text-secondary">
            Available &mdash; can be assigned
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cafe-accent shrink-0" />
          <span className="text-cafe-text-secondary">
            Occupied &mdash; order in progress
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableInfoView;
