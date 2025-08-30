"use server"
 
import LoginPage from "@/components/Pages/loginPage/loginPage";
import SignInPage from "@/components/Pages/loginPage/signInPage";


const Login = async ({ searchParams }) => {

  const searchParamsData = await searchParams
 
 
  let login = false;
  let username = null;
  if (searchParamsData.action === 'login') {
    login = true;
  }
   
  if (searchParamsData.username ) {
    username = searchParamsData.username;
  }
 




  return (
    <>
      {login ? (
        <LoginPage  />

      ) : (
        <SignInPage  username={username&& username}/>

      )}
    </>
  );
};

export default Login;
