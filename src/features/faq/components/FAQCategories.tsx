"use client";

import clsx from "clsx";

import type { Category } from "@/types";

interface FAQCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function FAQCategories({
  categories,
  selectedCategory,
  onCategoryChange,
}: FAQCategoriesProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onCategoryChange("all")}
        className={clsx(
          "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
          selectedCategory === "all"
            ? "border-(--primary) bg-(--primary) text-black"
            : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
        )}
      >
        All
      </button>

      {categories.map((category) => {
        const color = category.Color ?? undefined;

        return (
          <button
            key={category.documentId}
            type="button"
            onClick={() => onCategoryChange(category.Slug)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
              selectedCategory === category.Slug
                ? "text-white"
                : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
            )}
            style={
              selectedCategory === category.Slug
                ? {
                    backgroundColor: color,
                    borderColor: color,
                  }
                : undefined
            }
          >
            {category.Name}
          </button>
        );
      })}
    </div>
  );
}
