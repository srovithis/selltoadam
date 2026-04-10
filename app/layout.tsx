import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sell To Adam | We Buy Houses In MA & CT | Cash Home Buyer",
  description:
    "Sell your house fast in MA & CT. No fees, no commissions, no stress. Get a fair cash offer in 24 hours and close in days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
