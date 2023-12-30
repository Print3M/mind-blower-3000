import { Divider, Group, Text } from "@mantine/core"
import css from "./Header.module.css"

const Header = () => (
    <header className={css.header}>
        <Group gap={0} justify="center">
            <Text
                variant="gradient"
                gradient={{ from: "pink", to: "blue", deg: 0 }}
                fz={45}
                fw={900}
            >
                MindBlower
            </Text>
            <Text
                fz={45}
                fw={900}
                variant="gradient"
                gradient={{ from: "blue", to: "pink", deg: 0 }}
            >
                3000
            </Text>
        </Group>
        <Divider className={css.divider} />
    </header>
)

export default Header