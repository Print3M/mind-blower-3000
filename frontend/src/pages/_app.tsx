import "@mantine/core/styles/global.css"
import "@mantine/core/styles.css"
import type { AppProps } from "next/app"
import { MantineProvider } from "@mantine/core"
import Layout from "components/Layout/Layout"
import { theme } from "consts/theme"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    )
}
