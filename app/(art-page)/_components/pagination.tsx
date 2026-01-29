"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { KEY } from "@/utils/constant";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
  totalPages: number;
  currentPage: number;
}

function Paginate({ currentPage, totalPages }: iAppProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set(KEY, page.toString());
    } else {
      params.delete(KEY);
    }

    push(`?${params.toString()}`, { scroll: false });
  }

  function generatePagination() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (totalPages <= 3) {
      return [1, 2, 3, null, totalPages];
    }

    if (currentPage > totalPages - 2) {
      return [1, null, totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      totalPages,
    ];
  }

  return (
    <div className="mt-24 flex items-center justify-center gap-8 text-xs tracking-[0.35em] uppercase">
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={`${
              currentPage === 1
                ? "pointer-events-none opacity-50 transition hover:text-primary hover:bg-primary/10 hover:border-primary/40 rounded-none"
                : ""
            }`}
            size={"sm"}
          />

          {generatePagination().map((page, index) =>
            page === null ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => (e.preventDefault(), handlePageChange(page))}
                  isActive={currentPage === page}
                  className={
                    "data-active:opacity-100 border-primary/50 outline-none rounded-none hover:bg-primary/10"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
            className={`${currentPage === totalPages} ? "pointer-events-none opacity-50 transition hover:text-white hover:bg-primary/10 hover:border-primary/40 rounded-none" :""`}
            size={"sm"}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Paginate;
