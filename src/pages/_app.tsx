import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

import "@/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png" />
        <title>QuestGen</title>
      </Head>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
};

export default api.withTRPC(MyApp);
