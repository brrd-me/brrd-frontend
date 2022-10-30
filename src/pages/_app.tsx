import "@/root/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

import ApplicationProvider from "@/sharedState/ApplicationProvider"
import { SendMessageProvider } from "@/components/SendMessage"

const hhDefaultURL = chain.hardhat.rpcUrls.default
const ALCHEMY_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC"
const customChain = {
  ...chain.hardhat,
  rpcUrls: {
    ...chain.hardhat.rpcUrls,
    default: process.env.NEXT_PUBLIC_HH_DEV_URL || hhDefaultURL,
  },
}
const { chains, provider, webSocketProvider } = configureChains(
  [customChain, chain.goerli],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: ALCHEMY_KEY,
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "BRRD",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <ApplicationProvider>
          <SendMessageProvider>
            <Component {...pageProps} />
          </SendMessageProvider>
        </ApplicationProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
