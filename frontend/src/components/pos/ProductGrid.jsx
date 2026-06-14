import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/dummyData';
import ProductCard from './ProductCard';

export const ProductGrid = ({ activeCategory, searchQuery }) => {
  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Find category details for headings
  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-6 scroll-smooth bg-cafe-bg select-none">
      {/* Category Heading (Hidden when "All" category is active) */}
      {activeCategory !== 'all' && currentCategory && (
        <div className="mb-5 flex items-baseline gap-2">
          <h2 className="font-display font-semibold text-lg text-cafe-text-primary">
            {currentCategory.name}
          </h2>
          <span className="font-sans text-xs text-cafe-text-secondary">
            &middot; {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-cafe-surface border border-cafe-border flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-cafe-text-secondary/70" />
          </div>
          <h3 className="font-display font-semibold text-base text-cafe-text-primary">
            No products found
          </h3>
          <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-1 max-w-[240px] leading-relaxed">
            We couldn't find anything matching "{searchQuery}". Try a different term or category.
          </p>
        </div>
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductGrid;
