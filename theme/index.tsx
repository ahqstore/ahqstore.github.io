import Theme from "rspress/theme";
import { HomeLayout as BasicHomeLayout } from "rspress/theme";
import { ToolStack } from "./components/ToolStack";
import "./index.css";

function HomeLayout() {
  return <BasicHomeLayout />;
}

export default {
  ...Theme,
  HomeLayout,
};

export * from "rspress/theme";
