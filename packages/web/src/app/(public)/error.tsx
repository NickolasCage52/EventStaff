'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PublicErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page" aria-labelledby="err500-title">
      <div className="error-page__bg" aria-hidden="true" />
      <div className="container-page relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 text-center">
        <p className="error-page__code" id="err500-title" aria-label="Ошибка 500">
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
    </div>
  );
}
