import { Provider } from "react-redux"
import ChatbotWidget from "./ChatbotWidget"
import { store } from "../../app/store"

export default {
  title: "Components/ChatbotWidget",
  component: ChatbotWidget,
}

export const Default = () => (
  <Provider store={store}>
    <ChatbotWidget />
  </Provider>
)

export const Collapsed = () => (
  <Provider store={store}>
    <ChatbotWidget initialCollapsed={true} />
  </Provider>
)