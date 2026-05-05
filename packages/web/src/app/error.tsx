'use client';

import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';

/**
 * Граничный error boundary для сегментов без своего `error.tsx`
 * (например, кабинеты). Сегмент (public) использует `(public)/error.tsx`.
 */
export default function AppErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main className="error-page" aria-labelledby="err500-app-title">
        <div className="error-page__bg" aria-hidden="true" />
        <div className="container-page relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 text-center">
          <p className="error-page__code" id="err500-app-title" aria-label="Ошибка 500">
            500
          </p>
          <h1 className="error-page__heading">Что-то пошло не так</h1>
          <p className="error-page__desc">
            Мы уже знаем о проблеме и работаем над её устранением
          </p>
          <div className="mt-10 flex w-full flex-col items-center gap-3 min-[640px]:flex-row min-[640px]:justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={reset}
              className="w-full min-[640px]:w-auto"
            >
              Попробовать снова
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full min-[640px]:w-auto">
              <Link href="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
