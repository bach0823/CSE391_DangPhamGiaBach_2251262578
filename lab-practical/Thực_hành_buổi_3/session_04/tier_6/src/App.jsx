import CreateItem from "./components/CreateItem";
import DeleteItem from "./components/DeleteItem";
import ListBasics from "./components/ListBasics";
import UpdateItem from "./components/UpdateItem";

function App() {
  return (
    <>
      <ListBasics></ListBasics>
      <CreateItem></CreateItem>
      <DeleteItem></DeleteItem>
      <UpdateItem></UpdateItem>
    </>
  );
}

export default App;
