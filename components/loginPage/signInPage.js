import React, { useState, useEffect } from "react";
import Logo from "@/assets/Logo";
import SocialButton from "./socialButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const SignInPage = props => {
  const [form, setform] = useState({
    email: "test@email.com",
    username: "testUSername",
    password: "TEst passw",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const handelChange = e => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async e => {
    e.preventDefault();

    const { email, username, password } = form;

    const sendingData = {
      email,
      username,
      password,
      redirect: false,
      isSignUp: true,
    };

    let res = await signIn("credentials", sendingData);
   
    if (res.error) {
      alert(res.error)
    }

  };
  useEffect(() => {
    if (session?.user) {
      console.log(session.user);

      fetch("api/user")
        .then(res => res.json())
        .then(data => {

          
          if (data.isAvailable) {
            router.push("dashboard");
          } else {
            router.push("userinfo");
          }
        });
    }
  }, [session]);
  return (
    <main className="box border  flex h-screen ">
      <section className="left  border max-w-1/2 w-1/2 bg-white  text-black max-h-screen overflow-y-scroll ">
        <Logo customClass="h-20 " />
        <div className="box max-w-[75%] mx-auto flex flex-col  gap-7  bg-gray-50 p-3.5 rounded-sm text-center text-sm">
          <header className="text-center">
            <h1 className="    text-3xl font-bold">Join QuickLinks</h1>
            <p className=" text-base   text-gray-500">
              Sign in to your QuickLinks
            </p>
          </header>

          <form action="" className="flex flex-col    gap-1.5">
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="email"
              name="email"
              value={form.email}
              onChange={handelChange}
            />
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="username"
              name="username"
              value={form.username}
              onChange={handelChange}
            />
            <input
              className="custom-button cursor-auto bg-gray-200 font-light rounded-lg "
              type="text"
              placeholder="password"
              name="password"
              value={form.password}
              onChange={handelChange}
            />
            <button
              onClick={handelSubmit}
              className="custom-button rounded-lg bg-black text-white"
            >
              Continue
            </button>
          </form>
          <h3 className="text-center">OR</h3>
          {/* <div className="authLogin">google apple</div> */}
          {
            // (session) ? (<>Signed in as {session.user.email} <br /><button onClick={() => signOut()}>Sign out</button></>)
            //   :
            //   (<> Not signed in <br /><button onClick={() => signIn()}>Sign in</button></>)
          }

          <SocialButton />

          <div className="toggle flex justify-center items-center">
            <p>Already have an account?</p>
            <button
              onClick={props.toggle}
              className="text-purple-500  font-medium cursor-pointer"
            >
              Log in
            </button>
          </div>
        </div>
      </section>
      <section className="right border max-w-1/2 w-1/2">
        right image here
      </section>
    </main>
  );
};

export default SignInPage;
