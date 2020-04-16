//> React
// Contains all the functionality necessary to define React components
import React from "react";
import DoubleNavigationPage from "./components/DoubleNavBar";
//import SideNavPage from "./components/SlimSideNav";
//import SideNavPage from "./components/NavBar";
// DOM bindings for React Router

//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */



class App extends React.Component {
  render() {
    return (
        <div className="flyout">
          <DoubleNavigationPage />
        </div>
    );
  }
}

export default App;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
