import { emailShell, escapeHtml } from '@/emails/brand';

export function passwordResetEmail(data: {
  name: string;
  resetUrl: string;
}): { subject: string; html: string } {
  const subject = 'Сброс пароля — Юнити';
  const body = `
    <p style="margin:0 0 16px 0;">Здравствуйте, <strong>${escapeHtml(data.name)}</strong>!</p>
    <p style="margin:0 0 16px 0;">
      Мы получили запрос на сброс пароля для вашего аккаунта на платформе Юнити.
      Нажмите кнопку ниже, чтобы создать новый пароль.
    </p>
    <p style="margin:0 0 16px 0;padding:12px 16px;background:#fef3c7;border-radius:8px;font-size:13px;color:#92400e;">
      ⏱ Ссылка действительна в течение <strong>1 часа</strong> с момента отправки.
    </p>
    <p style="margin:0;font-size:13px;color:#6b7280;">
      Если вы не запрашивали сброс пароля — просто проигнорируйте это письмо.
      Ваш пароль останется прежним, и никаких изменений не произойдёт.
    </p>
  `;
  return {
    subject,
    html: emailShell({
      title: 'Сброс пароля',
      previewText: 'Ссылка для создания нового пароля на платформе Юнити',
      bodyHtml: body,
      ctaLabel: 'Сбросить пароль',
      ctaUrl: data.resetUrl,
    }),
  };
}
