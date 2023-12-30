import { AppShell } from "@mantine/core"
import { FC } from "react"
import css from './Layout.module.css'
import Header from "./Header/Header"

const Layout: FC<{ children: JSX.Element }> = ({ children }) => (
    <AppShell>
        <Header />
        <AppShell.Main className={css.main}>{children}</AppShell.Main>
    </AppShell>
)

export default Layout
