import ReactDOM from "react-dom/client";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    // domain="dev-kgajfw7shvtd0mlb.us.auth0.com"
    // clientId="2Dbz3cl09xaNtajQQdpHuGKWovzsl8zz"
    domain="dev-ewfdxrmfirxjj38r.us.auth0.com"
    clientId="4elFyDqxmMLWpogObJVCamOuEgjooCWY"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-ewfdxrmfirxjj38r.us.auth0.com/api/v2/",
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
