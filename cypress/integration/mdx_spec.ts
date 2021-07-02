describe("MDX", () => {
  describe("when it contains interactive components", () => {
    const OUTPUT_PATH = "dist";

    beforeEach(() => {
      cy.task("cleanupOutput", OUTPUT_PATH);
    });

    it("should be interactive", async () => {
      cy.task("compile", {
        filePath: "cypress/fixtures/mdx/index.mdx",
        outputPath: OUTPUT_PATH,
      });
      cy.visit(`${OUTPUT_PATH}/index.html`);

      cy.contains("0");
      cy.get("button").click();
      cy.contains("1");
    });
  });
});
