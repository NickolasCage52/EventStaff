'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { CheckCircle, XCircle } from 'lucide-react';
import { getPublicApiBase } from '@/lib/api/publicApiBase';

const schema = z
  .object({
    password: z.string().min(8, 'Минимум 8 символов').max(128),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'idle' | 'success' | 'invalid_token'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace('/auth/forgot-password');
    }
  }, [token, router]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch(`${getPublicApiBase()}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      const json = await res.json().catch(() => ({})) as { error?: { code?: string; message?: string } };

      if (json.error?.code === 'INVALID_OR_EXPIRED_TOKEN') {
        setStatus('invalid_token');
      } else {
        setServerError(json.error?.message ?? 'Произошла ошибка. Попробуйте позже.');
      }
    } catch {
      setServerError('Ошибка соединения. Попробуйте позже.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle className="h-12 w-12 text-success" />
        <h2 className="text-lg font-semibold text-gray-900">Пароль изменён</h2>
        <p className="text-sm text-gray-600">
          Ваш пароль успешно обновлён. Теперь вы можете войти с новым паролем.
        </p>
        <Link
          href="/auth/login"
          className="mt-2 inline-block rounded-input bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Войти
        </Link>
      </div>
    );
  }

  if (status === 'invalid_token') {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <XCircle className="h-12 w-12 text-error" />
        <h2 className="text-lg font-semibold text-gray-900">Ссылка недействительна</h2>
        <p className="text-sm text-gray-600">
          Ссылка устарела или уже была использована. Срок действия ссылки — 1 час.
        </p>
        <Link
          href="/auth/forgot-password"
          className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Запросить новую ссылку
        </Link>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Новый пароль"
        type="password"
        placeholder="Минимум 8 символов"
        error={form.formState.errors.password?.message}
        {...form.register('password')}
      />
      <FormField
        label="Подтвердите пароль"
        type="password"
        placeholder="Повторите новый пароль"
        error={form.formState.errors.confirmPassword?.message}
        {...form.register('confirmPassword')}
      />

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full rounded-input bg-primary-500 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-60"
      >
        {form.formState.isSubmitting ? 'Сохраняем...' : 'Сохранить новый пароль'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="rounded-modal border border-gray-200 bg-white p-8 shadow-card">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Новый пароль</h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Придумайте надёжный пароль для вашего аккаунта
      </p>
      <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-100" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
