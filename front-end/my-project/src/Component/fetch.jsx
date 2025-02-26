import { useState, useEffect } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item with ID: ${_id}`);
      }
      setData((prevData) => prevData.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError(error.message);
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleEdit = (_id) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");

    if (newName || newEmail) {
      setData((prevData) =>
        prevData.map((item) =>
          item._id === _id
            ? { ...item, name: newName || item.name, email: newEmail || item.email }
            : item
        )
      );
    }
  };

  return (
    <div className="p-6 mx-auto shadow-lg rounded-2xl bg-white mt-20 w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-center">User Data</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((ele) => (
            <div key={ele._id} className="border p-4 rounded-lg shadow-md bg-gray-100">
              <h3 className="font-semibold text-lg">Age: {ele.age}</h3>
              <p className="text-gray-700">Name: {ele.name}</p>
              <p className="text-gray-500">Email: {ele.email}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(ele._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ele._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center">No data available</p>
      )}
    </div>
  );
};

export default FetchData;
