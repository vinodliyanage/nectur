import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../services/user";
import User from "../types/User";

interface AuthContext {
  loggedIn: boolean;
  user: User | null;
  handleSignIn: (values: SignInValues) => any;
  handleSignOut: () => void;
  handleSignUp: (values: SignUpValues) => any;
  handleUserUpdate: (user: Partial<User>) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SignUpValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

export default function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    asyncFn();

    async function asyncFn() {
      const user = await UserService.get();
      if (!user) return;

      const validate = await UserService.validate(user);

      if (validate) {
        setUser(user);
        setLoggedIn(true);
      }
    }
  }, []);

  const handleSignIn = async (values: SignInValues) => {
    // TODO: send data to the server and validate the user

    const user = await UserService.get();
    if (!user) return false;
    
    await UserService.update({ token: "fake-token" }); // TODO: add real token
    setUser(user);
    setLoggedIn(true);

    return true;
  };

  const handleSignUp = async (values: SignUpValues) => {
    const { username, firstName, lastName, email, password } = values;

    const user = {
      username,
      firstName,
      lastName,
      email,
      token: "",
      photo: "",
    };

    //TODO: send data to the server and create a new user
    await UserService.set({ ...user, password });
    setUser(user);

    return true;
  };

  const handleSignOut = async () => {
    await UserService.update({ token: "" });
    setLoggedIn(false);
  };

  const handleUserUpdate = async (user: Partial<User>) => {
    const updatedUser = await UserService.update(user);
    setUser(updatedUser);
  };

  return (
    <Context.Provider
      value={{
        loggedIn,
        user,
        handleSignIn,
        handleSignOut,
        handleSignUp,
        handleUserUpdate,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
