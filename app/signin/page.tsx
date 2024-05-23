"use client";
import Link from "next/link";
import styles from "./signin.module.css";
import { useFormState } from "react-dom";
import signInAction from "./signInAction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const [signInForm, setSignInForm] = useFormState(signInAction, {
    success: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (signInForm.success) {
      router.push("/");
    }
  }, [router, signInForm]);
  return (
    <section className={styles.signIn}>
      <div className={`container ${styles.container}`}>
        {signInForm?.error && (
          <div className="alrt alert-danger">{signInForm?.error} </div>
        )}
        <form action={setSignInForm} noValidate>
          <h1> Welcome back</h1>
          <p>
            Dont have an account? <Link href="signup">Sign up here</Link>.
          </p>
          <div className={styles.content}>
            <div className={`input-group ${styles.formEmail}`}>
              <label>Email</label>
              <span className="validation-error"></span>
              <input type="text" name="email" />
            </div>
            <div className={`input-group ${styles.formPassword}`}>
              <label>Password</label>
              <span className="validation-error"></span>
              <input type="password" name="password" />
            </div>
            <div className={`input-group ${styles.formTerms}`}>
              <div className="input-group">
                <input
                  type="checkbox"
                  className="agreeterms"
                  name="isPersistent"
                />
                <label htmlFor="isPersistent"> Remember me</label>
              </div>
              <span className="validation-error"></span>
            </div>
            <button
              id="formSubmit"
              className={`btn btn-theme-s ${styles.formSubmit}`}
              type="submit"
            >
              Sign in
            </button>
            <Link href="/" className={styles.formForgotPassword}>
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
