import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "محاسبه ماترک",
  description: "سامانه محاسبه ماترک و سهم وراث بر اساس قانون مدنی ایران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
        <title></title>
      </head>
      <body className={``}>{children}</body>
    </html>
  );
}
