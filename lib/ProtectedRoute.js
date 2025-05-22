"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const publicPaths = ["/", "/forgotPassword" , "/login", "/signup", "/pricing", "/success", "/cancel"];

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const user = auth.currentUser;

      if (publicPaths.includes(pathname)) {
        setIsAuthorized(true);
        setLoading(false);
        return;
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().hasPaid === true) {
        setIsAuthorized(true);
      } else {
        router.push("/pricing");
      }

      setLoading(false);
    };

    verifyUser();
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthorized ? children : null;
}
