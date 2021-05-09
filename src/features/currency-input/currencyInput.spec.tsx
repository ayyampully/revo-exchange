import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CurrencyInput from "./CurrencyInput";
import { store } from "../../app/store";
import { Fields } from "../exchange/types";

describe("Currency Input", () => {
  it("should display balance correctly", async () => {
    //arrange
    const props = {
      fieldType: Fields.FROM,
      currency: "USD",
      balance: 100,
      value: "",
      onChange: jest.fn(),
      errorState: false,
    };

    render(
      <Provider store={store}>
        <CurrencyInput {...props} />
      </Provider>
    );

    //act
    const balance = await screen.findByText("Balance: 100");

    //assert
    expect(balance).toBeInTheDocument();
  });

  it("should display error message", async () => {
    //arrange
    const props = {
      fieldType: Fields.FROM,
      currency: "USD",
      balance: 100,
      value: "",
      onChange: jest.fn(),
      errorState: true,
    };

    render(
      <Provider store={store}>
        <CurrencyInput {...props} />
      </Provider>
    );

    //act
    const errorMsg = await screen.findByText("Exceeds balance");

    //assert
    expect(errorMsg).toBeInTheDocument();
  });

  it("should trigger callback with correct values", async () => {
    //arrange
    const props = {
      fieldType: Fields.FROM,
      currency: "USD",
      balance: 100,
      value: "",
      onChange: jest.fn(),
      errorState: true,
    };

    render(
      <Provider store={store}>
        <CurrencyInput {...props} />
      </Provider>
    );

    //act
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: "23.22" } });
    fireEvent.change(input, { target: { value: "23.2222" } });

    //assert
    expect(props.onChange).toBeCalledTimes(1);
    expect(props.onChange).toBeCalledWith("23.22");
  });
});
