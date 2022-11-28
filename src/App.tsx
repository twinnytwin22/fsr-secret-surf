import AppProviders from "./AppProviders";
import LandingPage from "./pages/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Page from "./components/Page";
import RedeemPage from "./pages/RedeemPage";

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<LandingPage />} />
            <Route
              key="redeem"
              path={`/redeem/:claimToken/:pinCode`}
              element={<RedeemPage />}
            />
            <Route
              key="redeem"
              path={`/redeem/:claimToken`}
              element={<RedeemPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}
