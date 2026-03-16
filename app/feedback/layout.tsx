import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обратная связь — EventStaff",
  description: "Свяжитесь с нами для вопросов и предложений",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
