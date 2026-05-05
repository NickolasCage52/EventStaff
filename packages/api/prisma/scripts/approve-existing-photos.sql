-- Migration script: auto-approve existing photos, logos, and gallery items
-- Run once after deploying media flow changes.
-- Documents and VIDEO_CARD records are left unchanged (still require moderation).

UPDATE media_assets
SET
  is_approved = true,
  is_rejected = false,
  moderated_at = NOW()
WHERE
  type IN ('AVATAR', 'PORTFOLIO_PHOTO', 'COMPANY_LOGO', 'COMPANY_BANNER', 'COMPANY_GALLERY')
  AND is_rejected = false;
