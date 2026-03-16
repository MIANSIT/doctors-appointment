import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Ayesha Rahman | Gynecologist & Women's Health Specialist – Dhaka",
  description:
    "Book an appointment with Dr. Ayesha Rahman, FCPS – a leading Gynecologist in Dhaka with 15+ years of experience. Trusted care for women at every stage of life.",
  keywords:
    "gynecologist dhaka, women doctor bangladesh, pregnancy care dhaka, PCOS treatment, laparoscopy bangladesh",
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
