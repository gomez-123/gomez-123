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

  const generatePageNumbers = () => {
    const pages = [];
    const delta = window.innerWidth < 640 ? 1 : 2; // Muestra menos páginas en pantallas pequeñas

    const range = {
      start: Math.max(2, currentPage - delta),
      end: Math.min(totalPages - 1, currentPage + delta),
    };

    // Agregar la primera página
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Agregar puntos suspensivos si es necesario
    if (range.start > 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Agregar los números de las páginas cercanas a la actual
    for (let i = range.start; i <= range.end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Agregar puntos suspensivos antes de la última página si es necesario
    if (range.end < totalPages - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Agregar la última página
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent className="flex justify-center items-center flex-wrap space-x-1 mt-4 text-sm sm:text-base">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousClick}
            className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
          >
            Anterior
          </PaginationPrevious>
        </PaginationItem>

        {generatePageNumbers()}

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
