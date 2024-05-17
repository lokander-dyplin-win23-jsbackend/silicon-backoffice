"use server";

import { strict } from "assert";
import { cookies } from "next/headers";

type ActionTypes = {
  success: boolean;
  error?: string | undefined;
};
export default async function signInAction(
  currentState: any,
  formData: FormData
): Promise<ActionTypes> {
  const email = formData.get("email");
  const password = formData.get("password");
  const isPersistent = formData.get("isPersistent");

  const signInFormData = {
    email,
    password,
    isPersistent: isPersistent ? isPersistent : false,
  };

  try {
    const res = await fetch(
      "https://accountprovider-silicons.azurewebsites.net/api/SignIn?code=kMy2--RiO3urtXGuP7nzRuTSHuBR0_yY_V-AjqCVGE8fAzFu9Gk49g==",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInFormData),
      }
    );

    if (res.status === 200) {
      return { success: true };
      //const result = await res.json();
      // cookies().set("Authorization", result.token, {
      // secure: true,
      // httpOnly: true,
      // expires: Date.now() + 24 * 60 * 60 * 1000 * 1,
      // path: "/",
      // sameSite: "strict",
      //});
      //return { success: true };
    } else {
      const result = await res.json();
      return { success: false, error: result.error };
    }
  } catch {
    return {
      success: false,
      error: "unable to sign in right now, please try again later",
    };
  }
}
