import { AppShell, Box } from "@mantine/core"
import { FC } from "react"
import css from "./Layout.module.css"
import Header from "./Header/Header"

const Layout: FC<{ children: JSX.Element }> = ({ children }) => (
    <AppShell>
        <Header />
        <Box className={css.main}>{children}</Box>
    </AppShell>
)

export default Layout
