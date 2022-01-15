import './login.scss';
import { useAuth0 } from "@auth0/auth0-react";
//import Form from '../Form/form';

function Login () {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  )
}

export default Login;