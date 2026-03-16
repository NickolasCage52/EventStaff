import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "EventStaff — Биржа труда для event-персонала",
  description: "Платформа для поиска персонала и работы в ресторанной и event-индустрии по всей России",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans">
        <ConditionalLayout>{children}</ConditionalLayout>
        <ScrollToTop />
      </body>
    </html>
  );
}
