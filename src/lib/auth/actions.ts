
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createServerClient } from "./supabase";

/**
 * Signs in a user with email and password extracted from FormData.
 *
 * Expected form fields:
 *  - email: string
 *  - password: string
 *
 * Returns an object with an `error` property if authentication fails.
 */
export async function signIn(
  formData: FormData,
): Promise<{ error?: string }> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

/**
 * Signs the current user out and redirects to the login page.
 */
export async function signOut(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * Returns the authenticated user, or null if no valid session exists.
 *
 * Uses `supabase.auth.getUser()` which validates the session against the
 * Supabase Auth server, making it safe for authorization checks.
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Failed to retrieve user:", error.message);
    return null;
  }

  return user;
}
