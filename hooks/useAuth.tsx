import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
	const user = useContext(AuthContext);

	return user;
}
