"use server";

import { Email } from "./state";

export async function getEmails() {
  const response = await fetch("https://flipkart-email-mock.vercel.app/");
  const emails = (await response.json()).list;
  const updatedEmails = emails.map((email: Email) => ({
    ...email,
    isRead: false,
    isFavorite: false,
  }));

  return updatedEmails as Email[];
}

export async function getEmail(id: number) {
  const response = await fetch(
    `https://flipkart-email-mock.vercel.app/?id=${id}`,
  );
  return await response.json();
}
