export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export function isAdminEmail(email?: string | null) {
    return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}
