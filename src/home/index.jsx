import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "react-query";
import FormPopup from "../edit";

const queryClient = new QueryClient();

function HomePage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({});
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAdd = () => {};

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleEdit = (id) => {
    console.log(`Id is Edit: ${id}`);
    event.stopPropagation();
    setOpen((prevOpenPopup) => ({
      ...prevOpenPopup,
      [id]: true,
    }));
    setEditItem(data.find((item) => item.id === id));
  };
  const handleClose = (id) => {
    setOpen((prevOpenPopup) => ({
      ...prevOpenPopup,
      [id]: false,
    }));
  };

  const handleEditSuccess = (editedData) => {
    const newData = data.map((item) =>
      item.id === editedData.id ? editedData : item
    );
    setData(newData);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ textAlign: "left" }}>
        <button
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "white",
          }}
          onClick={() => handleAdd}
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "black" }}
          ></FontAwesomeIcon>
        </button>
        {data.map((item) => (
          <div key={item.id} style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
                marginBottom: "20px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ color: "blue" }}>{item.title}</h2>
                <h3 style={{ color: "black" }}>{item.body}</h3>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                gap: "20px",
              }}
            >
              <button onClick={() => handleDelete(item.id)}>
                <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
              </button>

              <button onClick={() => handleEdit(item.id)}>
                <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
              </button>
              <FormPopup
                open={open[item.id] || false}
                handleClose={() => handleClose(item.id)}
                formData={editItem}
                handleSuccess={handleEditSuccess}
              />
            </div>
          </div>
        ))}
      </div>
    </QueryClientProvider>
  );
}

export default HomePage;
