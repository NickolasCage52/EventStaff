-- Add PASSWORD_RESET value to InAppNotificationType enum
ALTER TYPE "InAppNotificationType" ADD VALUE IF NOT EXISTS 'PASSWORD_RESET';
