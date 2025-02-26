import { useEffect, useState } from "react";

const UserForm = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { email, age, name };

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData.error);
        alert("Error: " + errorData.error);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Form submitted successfully!");

      setUsername("");
      setEmail("");
      setAge("");

      fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">User Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a username"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>

     <div className="mt-6">
        <h3 className="text-xl font-bold text-center mb-2">User List</h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {data.length > 0 ? (
          <ul className="space-y-2">
            {data.map((user) => (
              <li key={user.id} className="p-2 border rounded bg-gray-400 text-white font-serif ">
                {user.name} ({user.email}, Age: {user.age})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No users available</p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
