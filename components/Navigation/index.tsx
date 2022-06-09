import {NavigateContainer, NavigateLink} from "./styled"

export function Navigation() {
    return (<>
            <NavigateContainer>
                <NavigateLink
                    href={"https://2a7.notion.site/Skill-up-Day-a081d794f8664b7bba656708246a91ce"}>Notion</NavigateLink>
                <NavigateLink href={"/gugudan"}>구구단</NavigateLink>
                <NavigateLink href={"/wordquiz"}>Word Quiz</NavigateLink>
            </NavigateContainer>
        </>
    )
}
