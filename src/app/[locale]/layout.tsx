import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Inter} from 'next/font/google';
import '../globals.css';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  console.log('LocaleLayout running, locale is:', locale);
  console.log('Valid locales:', routing.locales);
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    console.log('Calling notFound() from layout because locale is invalid:', locale);
    notFound();
  }

  // Receiving messages provided in `i18n.ts`
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A142F] text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
