import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  describe("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: "100", result: "PLN 100.00 = $28.57" },
      { amount: "20", result: "PLN 20.00 = $5.71" },
      { amount: "200", result: "PLN 200.00 = $57.14" },
      { amount: "345", result: "PLN 345.00 = $98.57" },
    ];

    for (const testObj of testCases) {
      const amountAsNum = parseInt(testObj.amount);

      it("test", () => {
        // render component
        render(
          <ResultBox
            key={testObj.amount}
            from="PLN"
            to="USD"
            amount={amountAsNum}
          />
        );
        // find main div
        const resultField = screen.getByTestId("result");

        // check if output = input
        expect(resultField).toHaveTextContent(testObj.result);

        // unmount component
        cleanup();
      });
    }
  });
});
