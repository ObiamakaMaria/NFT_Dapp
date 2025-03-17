import React from 'react';
import ReactDOM from 'react-dom/client';
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import App from "./App";
import { config } from "./config/wallet-connection/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { AppProvider } from "./contexts/appContext";
import { ThemeProvider } from './providers/ThemeProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AppProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
