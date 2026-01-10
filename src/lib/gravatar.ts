import crypto from "crypto";

export function getGravatarUrl(email: string, size = 80) {
  const normalized = email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(normalized).digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=monsterid`;
}
