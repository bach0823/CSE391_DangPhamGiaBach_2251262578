import ClickEvents from "./components/ClickEvents";
import FormEvents from "./components/FormEvents";
import InputEvents from "./components/InputEvents";
import KeyboardEvents from "./components/KeyboardEvents";

function App() {
  return (
    <>
      <ClickEvents></ClickEvents>
      <InputEvents></InputEvents>
      <KeyboardEvents></KeyboardEvents>
      <FormEvents></FormEvents>
    </>
  );
}

export default App;
