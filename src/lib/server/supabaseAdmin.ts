import { createClient } from "@supabase/supabase-js";
import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Supabase env missing");
}

export const supabaseAdmin = createClient(supabaseUrl!, serviceRoleKey!);


export async function uploadImageToServer(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  return res.json(); // { url: string, path?: string, public?: boolean }
}