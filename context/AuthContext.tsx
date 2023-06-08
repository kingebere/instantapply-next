import { getSession } from "@/supabase";
import { Session, UserAttributes } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";
import User from "@supabase/supabase-js";
import { UserAttributeKeyList } from "aws-sdk/clients/inspector";

export const AuthContext = createContext<UserAttributes | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAttributes | null>(null);

  //get user's details
  useEffect(() => {
    async function getUser() {
      const session: Session | null = await getSession();
      if (session) {
        return setUser(session.user);
      }
      return setUser(null);
    }

    getUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
