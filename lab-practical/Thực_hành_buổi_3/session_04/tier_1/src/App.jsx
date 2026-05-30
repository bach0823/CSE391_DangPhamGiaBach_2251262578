import "./App.css";
import LifecycleDemo from "./components/LifecycleDemo";
import GoodCounter from "./components/GoodCounter";
import FlowDemo from "./components/FlowDemo";

function App() {
  return (
    <>
      <LifecycleDemo></LifecycleDemo>
      <br />
      <GoodCounter></GoodCounter>
      <br />
      <FlowDemo></FlowDemo>
    </>
  );
}

export default App;

// 1.1
// Tại sao component chỉ render 1 lần?
//  Vì mặc định React chỉ chạy hàm để vẽ giao diện 1 lần lúc ban đầu.
// Nếu bạn dùng biến bình thường (let count = 0), khi biến thay đổi,
// React không nhận biết để vẽ lại màn hình.

// Khi nào nó sẽ render lại? Chỉ khi dùng useState.
// Vì react sẽ nhận biêt được sự cập nhật thông qua useState.
