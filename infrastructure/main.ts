import { App, CloudBackend, NamedCloudWorkspace } from "cdktf";
import { MainStack } from "./stacks/mainStack";

const app = new App();
const stack = new MainStack(app, "main");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "sydneybikemap",
  workspaces: new NamedCloudWorkspace("sydneybikemap"),
});
app.synth();
