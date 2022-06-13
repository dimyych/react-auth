import { React, useState, useEffect } from "react";
import AuthPage from "pages/auth/AuthPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import MainPage from "pages/main/MainPage";

function App() {
  const navigate = useNavigate();

  const movieApiKey = "3b63a23c580d82f2fd5f3fcea2a73e28";
  const [movies, setMovies] = useState([]);
  const auth = getAuth();

  const [errorMessages, setErrorMessages] = useState({
    login: "",
    singup: "",
  });

  async function fetchPosts() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=en-US&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        setMovies(data.results);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setErrorMessages({ ...errorMessages, login: "", singup: "" });
        navigate("/", { replace: true });
      } else {
        navigate("/auth/login", { replace: true });
      }
    });
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<MainPage auth={auth} movies={movies} setErrorMessages={setErrorMessages}
            errorMessages={errorMessages}/>} />
      <Route
        path="/auth/*"
        element={
          <AuthPage
            auth={auth}
            navigate={navigate}
            setErrorMessages={setErrorMessages}
            errorMessages={errorMessages}
          />
        }
      />
    </Routes>
  );
}

export default App;
