// import React, { useEffect, useContext } from "react";
// import { BrowserRouter as Router } from "react-router-dom";

// import Layout from "./components/Layout";
// import RoutesComponent from "./routes/routes";
// import AuthContext, { AuthProvider } from "./context/AuthContext";

// function App() {
//     const { user, setUser } = useContext(AuthContext);

//     useEffect(() => {
//         // ✅ Fetch user data from local storage or API
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser)); // Set user globally
//         }
//     }, [setUser]);

//     return (
//         <AuthProvider> {/* ✅ Wrap the whole app inside AuthProvider */}
//             <Router>
//                 <Layout userRole={user?.role || "guest"}> {/* Default to "guest" */}
//                     <RoutesComponent />
//                 </Layout>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
// import RoutesComponent from "./routes/routes";
import { AuthProvider } from "./context/AuthContext"; // Correct import
import RoutesComponent from "./routes/routes";
console.log(RoutesComponent);
console.log(AuthProvider);

function App() {
    console.log('Hi');
    
    return (
        <AuthProvider> {/* ✅ AuthProvider must wrap everything */}
            {/* <Router> */}
                {/* <Layout> */}
                    <RoutesComponent />
                {/* </Layout> */}
            {/* </Router> */}
         </AuthProvider>
    );
}

export default App;


