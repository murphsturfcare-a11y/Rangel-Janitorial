import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Murphy's Turf",
  description: "Professional lawn care services in Colorado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
