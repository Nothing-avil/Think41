const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5; // or any number you choose
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

const paginatedProducts = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.slice(start, end);
}, [filteredProducts, currentPage]);

function PaginationControls({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <button onClick={() => setCurrentPage(current => Math.max(current - 1, 1))} disabled={currentPage === 1}>
        Prev
      </button>
      <span style={{ margin: "0 8px" }}>{currentPage} / {totalPages}</span>
      <button onClick={() => setCurrentPage(current => Math.min(current + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

// In your main render/component:
<ProductList products={paginatedProducts} />
<PaginationControls
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
/>
