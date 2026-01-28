import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useItems } from "./customHooks/useItems";
import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";
import "./App.css";
import { useState } from "react";

function App() {
  const {
    items,
    createItem,
    deleteItem,
    updateItem,
    fetchItems,
    downloadPdf,
    downloadExcel,
    search,
    setSearch,
    page,
    setPage,
    total,
    limit,
    setLimit,
  } = useItems();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleCreate = async (item) => {
    try {
      await createItem(item);
      setOpen(false);
      toast.success("Item created!");
      fetchItems();
    } catch {
      toast.error("Error creating item!");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleUpdate = async (item) => {
    try {
      await updateItem(editItem.id, item);
      setOpen(false);
      setEditItem(null);
      toast.success("Item updated!");
      fetchItems();
    } catch {
      toast.error("Error updating item!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted!");
      fetchItems();
    } catch {
      toast.error("Error deleting item!");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await downloadPdf();

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "ListItems.pdf";
      a.click();
      a.remove();

      toast.success("PDF downloaded!");
    } catch {
      toast.error("Error downloading item!");
    }
  };

  const handleDownloadEXEL = async () => {
    try {
      const blob = await downloadExcel();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "items.xlsx";
      a.click();
      toast.success("EXEL downloaded!");
    } catch {
      toast.error("Error downloading item!");
    }
  }

  return (
    <div className="app">
      <h1 className="app__title">CRUD App</h1>
      <div className="filter">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter__input"
        />
        <button onClick={() => setOpen(true)} className="filter__button">
          Add
        </button>
        <button onClick={handleDownloadPDF} className="filter__button">
          PDF
        </button>
        <button onClick={handleDownloadEXEL} className="filter__button">EXEL</button>
      </div>
      {open && (
        <div className="modal">
          <div className="modal__content">
            <h3 className="modal__title">
              {editItem ? "Edit Item" : "Add Item"}
            </h3>

            <ItemForm
              onSubmit={editItem ? handleUpdate : handleCreate}
              initialData={editItem || { name: "", description: "" }}
            />

            <div className="modal__actions">
              <button
                className="modal__button modal__button--cancel"
                onClick={() => {
                  setOpen(false);
                  setEditItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={handleEdit}
        page={page}
        setPage={setPage}
        total={total}
        limit={limit}
        setLimit={setLimit}
        search={search}
      />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
