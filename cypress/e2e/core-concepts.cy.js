describe('Cypress core concepts', () => {

    it('Synchronous vs Asynchronous', () => {
        console.log("Start");

        setTimeout(function () {
            console.log("Middle");
        }, 2000);

        console.log("End");
    });
});