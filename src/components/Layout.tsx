import Navigation from "./Navigation";
import {PropsWithChildren} from "react";

export const Layout = ({children}: PropsWithChildren) => {
    return (
        <>
            <Navigation/>
            <div className="app-container bg-light">
                {children}
            </div>
        </>
    );
};
