import { useStyler } from "./Component/Styler";
import TodoList from "./Component/TodoList";
import Footer from "./Component/Footer";

function App() {
  useStyler();
  return (
    <>
      <TodoList />
      <Footer />
    </>
  );
}

export default App;
