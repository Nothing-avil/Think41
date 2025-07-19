const [sortField, setSortField] = useState('price');
const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

const sortedProducts = useMemo(() => {
  const sorted = [...products].sort((a, b) => {
    if (sortField === "price") {
      return sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    } else if (sortField === "name") {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
  return sorted;
}, [products, sortField, sortOrder]);
