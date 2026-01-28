import { useEffect, useState } from "react";

export const ItemForm = ({
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="name"
        placeholder="Name"
        className="form__input"
        value={form.name}
        onChange={handleChange}
        required
        minLength={2}
      />
      <input
        name="description"
        placeholder="Description"
        className="form__input"
        value={form.description}
        onChange={handleChange}
        required
        minLength={5}
      />
      <button type="submit" className="form__button">
        Submit
      </button>
    </form>
  );
};
