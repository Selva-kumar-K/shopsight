// import { render, screen } from "@testing-library/react";
// import { OrderStatusBadge } from "./OrderStatusBadge";
// import { Order } from "@/lib/types";

// // ---------------------------------------------------------------------------
// // Mock
// // ---------------------------------------------------------------------------

// jest.mock("@/lib/utils", () => ({
//   cn: (...classes: (string | undefined | null | false)[]) =>
//     classes.filter(Boolean).join(" "),
// }));

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------

// type Status = Order["status"];

// const ALL_STATUSES: Status[] = [
//   "pending",
//   "processing",
//   "shipped",
//   "delivered",
//   "cancelled",
// ];

// // ---------------------------------------------------------------------------
// // Tests
// // ---------------------------------------------------------------------------

// describe("OrderStatusBadge", () => {
//   describe("renders without crashing", () => {
//     it("renders for every valid status without throwing", () => {
//       ALL_STATUSES.forEach((status) => {
//         const { unmount } = render(<OrderStatusBadge status={status} />);
//         expect(screen.getByText(new RegExp(status, "i"))).toBeInTheDocument();
//         unmount();
//       });
//     });
//   });

//   describe("label text", () => {
//     it.each<[Status, string]>([
//       ["pending", "Pending"],
//       ["processing", "Processing"],
//       ["shipped", "Shipped"],
//       ["delivered", "Delivered"],
//       ["cancelled", "Cancelled"],
//     ])('renders "%s" as the capitalised label "%s"', (status, expectedLabel) => {
//       render(<OrderStatusBadge status={status} />);
//       expect(screen.getByText(expectedLabel)).toBeInTheDocument();
//     });
//   });

//   describe("color classes", () => {
//     it.each<[Status, string, string]>([
//       ["pending", "bg-yellow-50", "text-yellow-700"],
//       ["processing", "bg-blue-50", "text-blue-700"],
//       ["shipped", "bg-purple-50", "text-purple-700"],
//       ["delivered", "bg-green-50", "text-green-700"],
//       ["cancelled", "bg-red-50", "text-red-700"],
//     ])(
//       'applies "%s" and "%s" classes for status "%s"',
//       (status, bgClass, textClass) => {
//         render(<OrderStatusBadge status={status} />);

//         // Capitalise the first letter to match the rendered text
//         const label =
//           status.charAt(0).toUpperCase() + status.slice(1);
//         const badge = screen.getByText(label);

//         expect(badge).toHaveClass(bgClass);
//         expect(badge).toHaveClass(textClass);
//       }
//     );
//   });
// });
