import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRouter } from "./routers";
import { DataProvider } from "./data_router";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {publicRouter.map((router, index) => {
              const Page = router.component;
              return (
                <Route key={index} path={router.path} element={<Page />} />
              );
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
