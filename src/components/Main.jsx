import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"


const Main = (props) => {

  const [cheese, setCheese] = useState(null)
  const url = "https://jmp-cheese-app.herokuapp.com/cheese/";

  const getCheese = async () => {
    const response = await fetch(url);
    const data = await response.json()
    setCheese(data)
  }

  const createCheese = async (che) => {
    //make a post request to create cheese
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(che),
    })
    getCheese()
  }


  //update cheese

  const updateCheese = async (cheese, id) => {
    await fetch(url + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify(cheese)
    })
  getCheese()
  }


  //delete cheese

  const deleteCheese = async (id) => {
    await fetch(url + id, {
      method: "delete"
    })
    getCheese()
  }

  useEffect(()=>getCheese(),[])

  return (
    <main>
      <Routes>
        <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>} />
        <Route path="/cheese/:id" element={<Show
          cheese={cheese}
          updateCheese={updateCheese}
          deleteCheese={deleteCheese}
        />} />
      </Routes>
    </main>
  )
}
export default Main