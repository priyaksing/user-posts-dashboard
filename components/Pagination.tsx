interface PaginationProps {
  length: number;
  postsPerPage: number;
  onPageChange: any;
}

/**
 * Render page numbers based on the number of posts
 * @param - total posts, posts per page, page change handler
 */
export default function Pagination({
  length,
  postsPerPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  let i: number;

  for (i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-4">
      {pageNumbers.map((page) => (
        <button
          onClick={() => onPageChange(page)}
          key={page}
          className="py-2 px-3 border border-white hover:bg-white hover:text-black"
        >
          {page}
        </button>
      ))}
    </div>
  );
}
