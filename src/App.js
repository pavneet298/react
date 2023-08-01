import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Component1 from "./context/Component1";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Todo />} />
    //     <Route path="/add-todo" element={<AddTodo />} />
    //     {/* <Route path="/edit-todo/:rid" element={<AddTodo/>}/> */}
    //     <Route path="/edit-todo" element={<AddTodo />} />
    //     <Route path="*" element={<Notfound />} />
    //   </Routes>
    // </BrowserRouter>

    <Component1/>
  );
}

export default App;
