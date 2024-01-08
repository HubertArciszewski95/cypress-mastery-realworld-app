class Header {

    elements = {
        navItems: () => cy.getByTestId("nav-item"),
        dropdownMenuItems: () => cy.getByTestId("dropdown-item"),
    }

    logout() {
        this.elements.navItems().last().click();
        this.elements.dropdownMenuItems().contains("Logout").click();
    }
}

export default Header;
