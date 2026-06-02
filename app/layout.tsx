import './globals.css';

import ClientAnalytics from './providers';

import {
  Bricolage_Grotesque,
} from 'next/font/google';

const bricolage =
  Bricolage_Grotesque({
    subsets: ['latin'],
    variable:
      '--font-bricolage',
  });

export const metadata =
  {
    title:
      'Knightly',
    description:
      'Modern Chess Platform',
  };

export default function RootLayout({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={
        bricolage.variable
      }
    >
      <body>
        <ClientAnalytics />
        {children}
      </body>
    </html>
  );
}
