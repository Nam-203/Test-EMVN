import { Fragment, useEffect } from "react";
import "./App.css";
import { routes } from "./routes";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App() {
  const location = useLocation();
  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.path === location.pathname
    );
    if (currentRoute) {
      document.title = currentRoute.titleName;
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Helmet>
                    <title>{route.titleName}</title>
                  </Helmet>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </HelmetProvider>
  );
}

export default App;
