// /**
//  * Prerequisites — add these packages before running:
//  *
//  *   npm install --save-dev jest jest-environment-jsdom \
//  *     @testing-library/react @testing-library/user-event \
//  *     @testing-library/jest-dom \
//  *     @types/jest ts-jest
//  *
//  * Jest config (jest.config.ts) must include:
//  *   moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" }
//  *   testEnvironment: "jsdom"
//  *   setupFilesAfterFramework: ["@testing-library/jest-dom"]
//  */

// import React from "react";
// import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { ProductSearch } from "./ProductSearch";
// import type { Product } from "@/lib/types";

// // ---------------------------------------------------------------------------
// // Module mocks
// // ---------------------------------------------------------------------------

// // next/link renders a plain <a> in the test environment so href and click
// // behaviour work without a real Next.js router.
// jest.mock("next/link", () => {
//   const MockLink = ({
//     href,
//     children,
//     onClick,
//     ...rest
//   }: {
//     href: string;
//     children: React.ReactNode;
//     onClick?: React.MouseEventHandler<HTMLAnchorElement>;
//     [key: string]: unknown;
//   }) => (
//     <a href={href} onClick={onClick} {...rest}>
//       {children}
//     </a>
//   );
//   MockLink.displayName = "MockLink";
//   return MockLink;
// });

// // cn() uses clsx + tailwind-merge — mock it so the test environment does not
// // need the full Tailwind pipeline.
// jest.mock("@/lib/utils", () => ({
//   cn: (...classes: (string | undefined | false | null)[]) =>
//     classes.filter(Boolean).join(" "),
// }));

// // ---------------------------------------------------------------------------
// // Fixtures
// // ---------------------------------------------------------------------------

// const makeProduct = (overrides: Partial<Product> = {}): Product => ({
//   id: "prod-1",
//   name: "Test Widget",
//   category: "Widgets",
//   price: 9.99,
//   stock: 50,
//   ...overrides,
// });

// const PRODUCTS: Product[] = [
//   makeProduct({ id: "1", name: "Wireless Keyboard", category: "Electronics", price: 49.99, stock: 30 }),
//   makeProduct({ id: "2", name: "Ergonomic Mouse", category: "Electronics", price: 29.99, stock: 5 }),
//   makeProduct({ id: "3", name: "Standing Desk", category: "Furniture", price: 399.0, stock: 0 }),
//   makeProduct({ id: "4", name: "USB-C Hub", category: "Electronics", price: 19.99, stock: 100 }),
// ];

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------

// const setup = (props: Partial<React.ComponentProps<typeof ProductSearch>> = {}) => {
//   const user = userEvent.setup();
//   const onSelect = jest.fn();
//   render(<ProductSearch products={PRODUCTS} onSelect={onSelect} {...props} />);
//   const input = screen.getByRole("combobox", { name: /search products/i });
//   return { user, input, onSelect };
// };

// // ---------------------------------------------------------------------------
// // Tests
// // ---------------------------------------------------------------------------

// describe("ProductSearch", () => {
//   // 1. Renders the search input
//   describe("initial render", () => {
//     it("renders the search input", () => {
//       const { input } = setup();
//       expect(input).toBeInTheDocument();
//     });

//     it("renders with the correct placeholder text", () => {
//       const { input } = setup();
//       expect(input).toHaveAttribute("placeholder", "Search products\u2026");
//     });

//     it("renders with an empty value by default", () => {
//       const { input } = setup();
//       expect(input).toHaveValue("");
//     });
//   });

//   // 2. Dropdown is hidden when query is empty
//   describe("dropdown visibility", () => {
//     it("does not show the results list when the query is empty", () => {
//       setup();
//       expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//     });

//     it("sets aria-expanded to false on the combobox when query is empty", () => {
//       const { input } = setup();
//       expect(input).toHaveAttribute("aria-expanded", "false");
//     });

//     it("hides the results list after clearing the input", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");
//       expect(screen.getByRole("menu")).toBeInTheDocument();

//       await user.clear(input);
//       expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//     });
//   });

//   // 3. Dropdown shows matching results when user types
//   describe("search results", () => {
//     it("shows matching products by name", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");

//       const menu = screen.getByRole("menu", { name: /search results/i });
//       expect(within(menu).getByRole("menuitem", { name: /wireless keyboard/i })).toBeInTheDocument();
//     });

//     it("shows matching products by category", async () => {
//       const { user, input } = setup();

//       await user.type(input, "furniture");

//       const menu = screen.getByRole("menu", { name: /search results/i });
//       expect(within(menu).getByRole("menuitem", { name: /standing desk/i })).toBeInTheDocument();
//     });

//     it("matching is case-insensitive", async () => {
//       const { user, input } = setup();

//       await user.type(input, "MOUSE");

//       const menu = screen.getByRole("menu", { name: /search results/i });
//       expect(within(menu).getByRole("menuitem", { name: /ergonomic mouse/i })).toBeInTheDocument();
//     });

//     it("returns multiple results when several products match", async () => {
//       const { user, input } = setup();

//       // "Electronics" matches keyboard, mouse, and hub
//       await user.type(input, "electronics");

//       const menu = screen.getByRole("menu", { name: /search results/i });
//       const items = within(menu).getAllByRole("menuitem");
//       expect(items).toHaveLength(3);
//     });

//     it("sets aria-expanded to true on the combobox when results are shown", async () => {
//       const { user, input } = setup();

//       await user.type(input, "hub");

//       expect(input).toHaveAttribute("aria-expanded", "true");
//     });

//     it("each result links to the correct product page", async () => {
//       const { user, input } = setup();

//       await user.type(input, "hub");

//       const link = screen.getByRole("menuitem", { name: /usb-c hub/i });
//       expect(link).toHaveAttribute("href", "/products/4");
//     });

//     it("displays formatted price for each result", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");

//       expect(screen.getByText("$49.99")).toBeInTheDocument();
//     });

//     it("shows 'Out of stock' label when stock is zero", async () => {
//       const { user, input } = setup();

//       await user.type(input, "standing desk");

//       expect(screen.getByText("Out of stock")).toBeInTheDocument();
//     });

//     it("shows stock count when stock is greater than zero", async () => {
//       const { user, input } = setup();

//       await user.type(input, "ergonomic mouse");

//       expect(screen.getByText("5 in stock")).toBeInTheDocument();
//     });
//   });

//   // 4. Shows "No products found" when no results match
//   describe("empty state", () => {
//     it("shows no-results message when the query matches nothing", async () => {
//       const { user, input } = setup();

//       await user.type(input, "zzz-nonexistent");

//       expect(screen.getByText(/no products found/i)).toBeInTheDocument();
//     });

//     it("includes the search query in the no-results message", async () => {
//       const { user, input } = setup();

//       await user.type(input, "unicorn");

//       expect(screen.getByText(/no products found for/i)).toBeInTheDocument();
//       expect(screen.getByText(/unicorn/i)).toBeInTheDocument();
//     });

//     it("does not render any menuitem elements in the empty state", async () => {
//       const { user, input } = setup();

//       await user.type(input, "zzz-nonexistent");

//       expect(screen.queryAllByRole("menuitem")).toHaveLength(0);
//     });
//   });

//   // 5. Clear button appears when query is non-empty and clears input when clicked
//   describe("clear button", () => {
//     it("is not visible when the query is empty", () => {
//       setup();
//       expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();
//     });

//     it("appears when the user types a query", async () => {
//       const { user, input } = setup();

//       await user.type(input, "k");

//       expect(screen.getByRole("button", { name: /clear search/i })).toBeInTheDocument();
//     });

//     it("clears the input value when clicked", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");
//       await user.click(screen.getByRole("button", { name: /clear search/i }));

//       expect(input).toHaveValue("");
//     });

//     it("hides the results dropdown after clicking clear", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");
//       await user.click(screen.getByRole("button", { name: /clear search/i }));

//       expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//     });

//     it("hides itself after the query is cleared", async () => {
//       const { user, input } = setup();

//       await user.type(input, "keyboard");
//       await user.click(screen.getByRole("button", { name: /clear search/i }));

//       expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();
//     });
//   });

//   // 6. onSelect callback is called when a result is clicked
//   describe("onSelect callback", () => {
//     it("calls onSelect with the correct product when a result is clicked", async () => {
//       const { user, input, onSelect } = setup();

//       await user.type(input, "hub");
//       await user.click(screen.getByRole("menuitem", { name: /usb-c hub/i }));

//       expect(onSelect).toHaveBeenCalledTimes(1);
//       expect(onSelect).toHaveBeenCalledWith(
//         expect.objectContaining({ id: "4", name: "USB-C Hub" })
//       );
//     });

//     it("clears the input after a result is selected", async () => {
//       const { user, input } = setup();

//       await user.type(input, "hub");
//       await user.click(screen.getByRole("menuitem", { name: /usb-c hub/i }));

//       expect(input).toHaveValue("");
//     });

//     it("hides the dropdown after a result is selected", async () => {
//       const { user, input } = setup();

//       await user.type(input, "hub");
//       await user.click(screen.getByRole("menuitem", { name: /usb-c hub/i }));

//       expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//     });

//     it("does not throw when onSelect is not provided", async () => {
//       const { user, input } = setup({ onSelect: undefined });

//       await user.type(input, "hub");

//       await expect(
//         user.click(screen.getByRole("menuitem", { name: /usb-c hub/i }))
//       ).resolves.not.toThrow();
//     });
//   });

//   // Edge cases
//   describe("edge cases", () => {
//     it("renders without crashing when products array is empty", () => {
//       setup({ products: [] });
//       expect(screen.getByRole("combobox", { name: /search products/i })).toBeInTheDocument();
//     });

//     it("shows no-results message when products array is empty and user types", async () => {
//       const { user, input } = setup({ products: [] });

//       await user.type(input, "anything");

//       expect(screen.getByText(/no products found/i)).toBeInTheDocument();
//     });

//     it("ignores leading and trailing whitespace in the query", async () => {
//       const { user, input } = setup();

//       // Typing only spaces should not open the dropdown (trim produces empty string)
//       await user.type(input, "   ");

//       expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//     });

//     it("formats price as N/A when price is NaN", async () => {
//       const nanProduct = makeProduct({ id: "99", name: "Broken Price", price: NaN });
//       const { user, input } = setup({ products: [nanProduct] });

//       await user.type(input, "broken");

//       expect(screen.getByText("N/A")).toBeInTheDocument();
//     });
//   });
// });
