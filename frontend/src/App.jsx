import { BrowserRouter, Routes, Route ,} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"

          element={
   
      <Register />
   
  }       
        />

        <Route
  path="/login"
  element={<Login />}
/>

        <Route
          path="/dashboard"
          element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
        />

        <Route
          path="/create-interview"

           element={
    <ProtectedRoute>
      <CreateInterview />
    </ProtectedRoute>
  }
          
         
        />

        <Route
          path="/interview/:id"

           element={
    <ProtectedRoute>
      <Interview />
    </ProtectedRoute>
  }
          
        />

        <Route
          path="/result/:id"

          element={
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  }
         
        />
        
        <Route
          path="/history"

           element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
        
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;