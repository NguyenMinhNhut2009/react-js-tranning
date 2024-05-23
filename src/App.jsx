import HomePage from "./home";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { publicRouter } from "./router";
import "./App.css";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <div className="App">
        <HomePage />
        {/* <Routes>
            {publicRouter.map((router, index) => {
              const Page = router.component;
              return (
                <Route key={index} path={router.path} element={<Page />} />
              );
            })}
          </Routes> */}
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
