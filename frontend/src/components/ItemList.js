import React from "react";

export const ItemList = ({
  items,
  onDelete,
  onEdit,
  page,
  setPage,
  limit,
  total,
  search,
}) => {
  const totalPages = Math.ceil(total / limit);

  if (items.length === 0 && search === "") {
    return <p className="list__empty">Item list is empty.</p>;
  }

  if (items.length === 0 && search !== "") {
    return <p className="list__not-found">Item doesn't existed</p>;
  }

  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="list__item">
            <p>
              {item.name} - {item.description}
            </p>
            <div className="list__buttons">
              <button
                className="list__button list__button--edit"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="list__button list__button--delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination__item">
        <button
          className="pagination__button"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="pagination__info">
          {" "}
          Page {page + 1} / {totalPages}
        </span>
        <button
          className="pagination__button"
          disabled={items.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
