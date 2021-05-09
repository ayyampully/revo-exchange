import { fireEvent, render, screen } from "@testing-library/react";
import CurrencyModel from "./CurrencyModal";

describe("Currency Model", () => {
  it("should trigger close callback", async () => {
    //arrange
    const props = {
      currencies: {
        USD: "US Dollar",
      },
      onClose: jest.fn(),
      onChange: jest.fn(),
    };
    render(<CurrencyModel {...props} />);

    //act
    const closeBtn = screen.getByRole("button", { name: "close" });
    fireEvent.click(closeBtn);

    //assert
    expect(props.onClose).toBeCalledTimes(1);
  });
  it("should trigger onChange callback", async () => {
    //arrange
    const props = {
      currencies: {
        USD: "US Dollar",
        EUR: "Euro",
        GBP: "British Pound",
      },
      onClose: jest.fn(),
      onChange: jest.fn(),
    };
    render(<CurrencyModel {...props} />);

    //act
    const buttons = await screen.findAllByRole("button");
    const item = screen.getByRole("button", { name: "British Pound" });
    fireEvent.click(item);

    //assert
    expect(buttons).toHaveLength(4); // items + close button
    expect(props.onChange).toHaveBeenCalledWith("GBP");
  });

  it("should not display items in ignore list", async () => {
    //arrange
    const props = {
      currencies: {
        USD: "US Dollar",
        EUR: "Euro",
        GBP: "British Pound",
        INR: "Indian Rupee",
      },
      ignoreCurrency: ["USD", "GBP"],
      onClose: jest.fn(),
      onChange: jest.fn(),
    };
    render(<CurrencyModel {...props} />);

    //act
    const buttons = await screen.findAllByRole("button");
    const item1 = screen.queryByRole("button", { name: "US Dollar" });
    const item2 = screen.queryByRole("button", { name: "British Pound" });

    //assert
    expect(buttons).toHaveLength(3); // ( 4 items + 1 close ) - 2 ignored
    expect(item1).not.toBeInTheDocument();
    expect(item2).not.toBeInTheDocument();
  });
});
