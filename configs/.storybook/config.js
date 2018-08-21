import { configure } from "@storybook/react";

function loadStories() {
  require("../../src/index.js")
};

configure(loadStories, module);