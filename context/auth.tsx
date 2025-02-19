/** TODO:
 * Rutas: 
 * app /
 * (auth) ruta de validacion 
 *  -- sign-in login
 *  -- Sign-up registo
 * 
 * _layout
 * home
 */

import { auth } from "@/firebaseConfig";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function useAuth(){
    return useContext(AuthContext)
}

function useProtectedRoute(user){
    const segments = useSegments()
    const router = useRouter()
    const navigationState = useRootNavigationState()

    useEffect(() => { //hook validaciones
        //1ra Validacion
        //if(!navigationState?.key) return
        // segmento de inicio de app 
        const isAuthGroup = segments[0] === '(auth)'
        //2da Validacion Usuario y Grupo de Rutas
        if(!user && !isAuthGroup){
            router.replace("/sign-in")
        }else if(user && isAuthGroup){
            router.replace("/home")
        }
    }), [user, segments, navigationState]
}

export function Provider({children}){
    const [user, setUser] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        return () => unsubscribe();
      }, []);
    
      useProtectedRoute(user);
    
    const signIn = () => {} //Login
    const signUp = () => {} //Register
    const signOut = () => {} //Exit

    return (
        <AuthContext.Provider value={{setUser, user, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
