import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import axios from "axios";
import Alert from "../src/components/Alert";
import {setupAxios} from "../helpers/axiosWrapper";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    setupAxios(axios)

    return (
        <SessionProvider session={session}>
            <Alert />
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
