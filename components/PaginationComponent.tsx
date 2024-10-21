import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex justify-center items-center flex-wrap space-x-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousClick}
            className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
          >
            Anterior
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
              className="px-2 py-1" // Añadir padding para un mejor clic
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextClick}
            className={
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }
          >
            Siguiente
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
