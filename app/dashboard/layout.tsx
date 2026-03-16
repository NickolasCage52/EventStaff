import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет — EventStaff",
  description: "Управление профилем и вакансиями",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
