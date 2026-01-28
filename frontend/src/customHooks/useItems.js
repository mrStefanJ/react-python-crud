import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/items/";

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchItems = useCallback(async () => {
  setLoading(true);

  try {
    // Poziv API-ja sa parametrima za paginaciju i search
    const { data } = await axios.get(API_URL, {
      params: {
        skip: page * limit,
        limit,
        search,
      },
    });

    // data = { items: [...], total: X }
    const { items: fetchedItems, total: fetchedTotal } = data;

    // Postavljanje state-a
    setItems(fetchedItems);
    setTotal(fetchedTotal);

  } catch (err) {
    console.error("Error fetching items:", err);
  }

  setLoading(false);
}, [page, limit, search]);


  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (item) => {
    const res = await axios.post(API_URL, item);
    return res.data;
  };

  const updateItem = async (id, item) => {
    const res = await axios.put(`${API_URL}${id}`, item);
    return res.data;
  };

  const deleteItem = async (id) => {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.data;
  };

  return {
    items,
    total,
    loading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
  };
};
