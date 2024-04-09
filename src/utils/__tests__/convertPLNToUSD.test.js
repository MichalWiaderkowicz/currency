import { convertPLNToUSD } from "../convertPLNToUSD";

describe("ConvertPLNtoUSD", () => {
  it("should return proper value when good input", () => {
    expect(convertPLNToUSD(1)).toBe("$0.29");
    expect(convertPLNToUSD(2)).toBe("$0.57");
    expect(convertPLNToUSD(20)).toBe("$5.71");
    expect(convertPLNToUSD(12)).toBe("$3.43");
  });

  it("should return NaN when input is text", () => {
    expect(convertPLNToUSD("6")).toBeNaN();
    expect(convertPLNToUSD("abc")).toBeNaN();
    expect(convertPLNToUSD("-543")).toBeNaN();
  });

  it("should return NaN if input is empty", () => {
    expect(convertPLNToUSD()).toBeNaN();
    expect(convertPLNToUSD(null)).toBeNaN();
  });

  it('should return "Error" if input is not a text or number', () => {
    expect(convertPLNToUSD([])).toBe("Error");
    expect(convertPLNToUSD({})).toBe("Error");
    expect(convertPLNToUSD(function () {})).toBe("Error");
  });

  it('should return "$0.00" if input is < 0', () => {
    expect(convertPLNToUSD(-1)).toBe("$0.00");
    expect(convertPLNToUSD(-23.09)).toBe("$0.00");
    expect(convertPLNToUSD(-511.987)).toBe("$0.00");
  });
});
