import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const ThemeProvider = ({ children }) => {
    return (
        <Theme appearance="light" accentColor="violet" radius="medium">
            {children}
        </Theme>
    );
}; 