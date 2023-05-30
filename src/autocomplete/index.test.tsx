import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "./index";

describe("Autocomplete", () => {
  const options = ["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Lemon", "Orange"];

  test("renders input element", () => {
    render(<Autocomplete options={options} />);
    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();
  });

  test("selects option when clicked", async () => {
    render(<Autocomplete options={options} />);
    const inputElement = screen.getByTestId("input");

    fireEvent.change(inputElement, { target: { value: "b" } });
    await waitFor(() => expect(screen.getByTestId("Banana")).toBeInTheDocument());
    const optionElement = screen.getByTestId("Banana");
    fireEvent.click(optionElement);

    expect((inputElement as HTMLInputElement).value).toBe("Banana");
    const optionsContainer = screen.queryByRole("list");
    expect(optionsContainer).not.toBeInTheDocument();
  });

  test("hides options when input is cleared", async () => {
    render(<Autocomplete options={options} />);
    const inputElement = screen.getByTestId("input");

    fireEvent.change(inputElement, { target: { value: "b" } });

    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2));
    fireEvent.change(inputElement, { target: { value: "" } });

    await waitFor(() => expect(screen.queryByRole("list")).not.toBeInTheDocument());
  });
});
