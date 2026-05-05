'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { CheckCircle } from 'lucide-react';
import { getPublicApiBase } from '@/lib/api/publicApiBase';

const schema = z.object({
  email: z.string().min(1, 'Введите email'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      await fetch(`${getPublicApiBase()}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      // Always show success to avoid email enumeration
      setSent(true);
    } catch {
      setServerError('Ошибка соединения. Попробуйте позже.');
    }
  };

  return (
    <div className="rounded-modal border border-gray-200 bg-white p-8 shadow-card">
      <h1 className="text-center text-2xl font-bold text-gray-900">Восстановление пароля</h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Вспомнили пароль?{' '}
        <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">
          Войдите
        </Link>
      </p>

      {sent ? (
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <CheckCircle className="h-12 w-12 text-success" />
          <p className="text-sm text-gray-700">
            Если этот email зарегистрирован в системе, письмо с инструкцией придёт
            в течение нескольких минут.
          </p>
          <Link
            href="/auth/login"
            className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Вернуться ко входу
          </Link>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />

          {serverError && (
            <p className="text-sm text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-input bg-primary-500 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-60"
          >
            {form.formState.isSubmitting ? 'Отправляем...' : 'Отправить ссылку'}
          </button>
        </form>
      )}
    </div>
  );
}
