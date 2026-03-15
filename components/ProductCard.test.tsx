import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/types";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const baseProduct: Product = {
  id: "prod-1",
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  stock: 12,
  imageUrl: "https://example.com/headphones.jpg",
};

const outOfStockProduct: Product = {
  ...baseProduct,
  stock: 0,
};

const noImageProduct: Product = {
  ...baseProduct,
  imageUrl: undefined,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ProductCard", () => {
  describe("renders without crashing", () => {
    it("renders the product card", () => {
      render(<ProductCard product={baseProduct} />);
      expect(
        screen.getByRole("button", { name: /add wireless headphones to cart/i })
      ).toBeInTheDocument();
    });
  });

  describe("content display", () => {
    it("renders the product name", () => {
      render(<ProductCard product={baseProduct} />);
      expect(
        screen.getByRole("link", { name: /wireless headphones/i })
      ).toBeInTheDocument();
    });

    it("renders the formatted price", () => {
      render(<ProductCard product={baseProduct} />);
      expect(screen.getByText("$79.99")).toBeInTheDocument();
    });

    it("renders the category badge", () => {
      render(<ProductCard product={baseProduct} />);
      expect(screen.getByText("Electronics")).toBeInTheDocument();
    });

    it("renders product image when imageUrl is provided", () => {
      render(<ProductCard product={baseProduct} />);
      const img = screen.getByRole("img", { name: /wireless headphones/i });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", baseProduct.imageUrl);
    });

    it('shows "No image" placeholder when imageUrl is absent', () => {
      render(<ProductCard product={noImageProduct} />);
      expect(screen.getByText("No image")).toBeInTheDocument();
      expect(
        screen.queryByRole("img", { name: /wireless headphones/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("stock display", () => {
    it("shows the stock count when in stock", () => {
      render(<ProductCard product={baseProduct} />);
      expect(screen.getByText("12 in stock")).toBeInTheDocument();
    });

    it('shows "Out of stock" when stock is 0', () => {
      render(<ProductCard product={outOfStockProduct} />);
      expect(screen.getByText("Out of stock")).toBeInTheDocument();
    });
  });

  describe("add to cart button", () => {
    it("is enabled when the product is in stock", () => {
      render(<ProductCard product={baseProduct} />);
      expect(
        screen.getByRole("button", { name: /add wireless headphones to cart/i })
      ).not.toBeDisabled();
    });

    it("is disabled when stock is 0", () => {
      render(<ProductCard product={outOfStockProduct} />);
      expect(
        screen.getByRole("button", { name: /add wireless headphones to cart/i })
      ).toBeDisabled();
    });

    it("calls onAddToCart with the correct product when clicked", async () => {
      const user = userEvent.setup();
      const onAddToCart = jest.fn();

      render(<ProductCard product={baseProduct} onAddToCart={onAddToCart} />);

      await user.click(
        screen.getByRole("button", { name: /add wireless headphones to cart/i })
      );

      expect(onAddToCart).toHaveBeenCalledTimes(1);
      expect(onAddToCart).toHaveBeenCalledWith(baseProduct);
    });

    it("does not call onAddToCart when the button is disabled", async () => {
      const user = userEvent.setup();
      const onAddToCart = jest.fn();

      render(
        <ProductCard product={outOfStockProduct} onAddToCart={onAddToCart} />
      );

      await user.click(
        screen.getByRole("button", { name: /add wireless headphones to cart/i })
      );

      expect(onAddToCart).not.toHaveBeenCalled();
    });

    it("does not throw when onAddToCart is omitted and button is clicked", async () => {
      const user = userEvent.setup();

      render(<ProductCard product={baseProduct} />);

      await expect(
        user.click(
          screen.getByRole("button", {
            name: /add wireless headphones to cart/i,
          })
        )
      ).resolves.not.toThrow();
    });
  });

  describe("navigation", () => {
    it("links the product name to the correct product page", () => {
      render(<ProductCard product={baseProduct} />);
      const link = screen.getByRole("link", { name: /wireless headphones/i });
      expect(link).toHaveAttribute("href", `/products/${baseProduct.id}`);
    });
  });
});
