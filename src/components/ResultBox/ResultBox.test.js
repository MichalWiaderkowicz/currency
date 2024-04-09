import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  describe("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: 100, result: "PLN 100.00 = $28.57" },
      { amount: 20, result: "PLN 20.00 = $5.71" },
      { amount: 200, result: "PLN 200.00 = $57.14" },
      { amount: 345, result: "PLN 345.00 = $98.57" },
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

  describe("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: 100, result: "$100.00 = PLN 350.00" },
      { amount: 20, result: "$20.00 = PLN 70.00" },
      { amount: 200, result: "$200.00 = PLN 700.00" },
      { amount: 345, result: "$345.00 = PLN 1,207.50" },
    ];

    for (const testObj of testCases) {
      const amountAsNum = parseInt(testObj.amount);

      it("test", () => {
        // render component
        render(
          <ResultBox
            key={testObj.amount}
            from="USD"
            to="PLN"
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

  describe("should render proper info about conversion when from=to", () => {
    const testCases = [
      {
        amount: 100,
        from: "PLN",
        to: "PLN",
        result: "PLN 100.00 = PLN 100.00",
      },
      { amount: 100, from: "USD", to: "USD", result: "$100.00 = $100.00" },
      { amount: 25, from: "PLN", to: "PLN", result: "PLN 25.00 = PLN 25.00" },
      { amount: 25, from: "USD", to: "USD", result: "$25.00 = $25.00" },
    ];

    for (const testObj of testCases) {
      it("test", () => {
        //render component
        render(
          <ResultBox
            key={testObj.from}
            from={testObj.from}
            to={testObj.to}
            amount={testObj.amount}
          />
        );

        //find main div
        const resultField = screen.getByTestId("result");

        // check if output = input
        expect(resultField).toHaveTextContent(testObj.result);

        // unmount component
        cleanup();
      });
    }
  });
  describe('should render "Wrong value..." when input < 0', () => {
    const testCases = [
      { amount: -100, from: "PLN", to: "PLN", result: "Wrong value..." },
      { amount: -10, from: "USD", to: "USD", result: "Wrong value..." },
      { amount: -240, from: "PLN", to: "USD", result: "Wrong value..." },
      { amount: -15, from: "USD", to: "PLN", result: "Wrong value..." },
    ];

    for (const testObj of testCases) {
      it("test", () => {
        //render component
        render(
          <ResultBox
            key={testObj.from}
            from={testObj.from}
            to={testObj.to}
            amount={testObj.amount}
          />
        );

        //find main div
        const resultField = screen.getByTestId("result");

        // check if output = input
        expect(resultField).toHaveTextContent(testObj.result);

        // unmount component
        cleanup();
      });
    }
  });
});
