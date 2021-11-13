import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";


const Show = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const cheese = props.cheese;
  const thisCheese = cheese.find((c) => c._id === id);

  //state for form
  const [editForm, setEditForm] = useState(thisCheese);

  const handleChange = (event) => {
    setEditForm({...editForm,[event.target.name]:event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateCheese(editForm,id)
    navigate("/")
  }

  const handleDelete = () => {
    props.deleteCheese(thisCheese._id)
    navigate("/")
  }

  return (
    <div className="cheese">
      <h1>{thisCheese.name}</h1>
      <h2>{thisCheese.countryOfOrigin}</h2>
      <img src={thisCheese.image} alt={thisCheese.name} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country of Origin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese"/>
      </form>
      <button id="delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Show