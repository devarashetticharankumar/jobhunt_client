import ReactDOM from "react-dom/client";
import "./index.css";
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
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);

// src/index.js or src/App.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// src/index.js or src/App.js
function requestNotificationPermission() {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      subscribeUserToPush();
    } else {
      console.log("Notification permission denied.");
    }
  });
}

requestNotificationPermission();

// src/index.js or src/App.js
function subscribeUserToPush() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      const publicKey = "<Your VAPID Public Key>"; // Replace with your actual VAPID public key
      const options = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      };
      return registration.pushManager.subscribe(options);
    })
    .then(function (subscription) {
      console.log("User is subscribed:", subscription);
      // Send the subscription to your server
      sendSubscriptionToServer(subscription);
    })
    .catch(function (error) {
      console.error("Failed to subscribe user:", error);
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

// src/index.js or src/App.js
function sendSubscriptionToServer(subscription) {
  fetch("/api/save-subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Subscription saved on server:", data);
    })
    .catch((error) => {
      console.error("Error saving subscription:", error);
    });
}
