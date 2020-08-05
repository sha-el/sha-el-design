import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import { Input } from "../Input";
import { MdEmail, MdSubject } from "react-icons/md";
import { Divider } from "../Divider";

const stories = storiesOf("Input", module);

stories.add(
  "Basic",
  withInfo({ inline: true })(() => (
    <div style={{ padding: "10px" }}>
      <Input placeholder="With border(default)" />
      <Divider />
      <Input borderLess placeholder="Borderless" />
    </div>
  ))
);

stories.add(
  "With Floating Label",
  withInfo({ inline: true })(() => (
    <div style={{ padding: "10px" }}>
      <Input label="Label" />
      <Divider />

      <Input borderLess label="Label" />
    </div>
  ))
);

stories.add(
  "With Error and hint",
  withInfo({ inline: true })(() => (
    <div style={{ padding: "10px" }}>
      <Input
        placeholder="With Error"
        label="Label"
        error="Some Error"
        hint="Please enter"
      />
      <Divider />

      <Input
        borderLess
        placeholder="With Error"
        label="Label"
        error="Some Error"
        hint="Please enter"
      />
    </div>
  ))
);

stories.add(
  "With Before and after elements",
  withInfo({ inline: true })(() => (
    <div style={{ padding: "10px" }}>
      <Input label="Label" before={<MdEmail />} after={<MdSubject />} />
      <Divider />

      <Input
        borderLess
        label="Label"
        before={<MdEmail />}
        after={<MdSubject />}
      />
    </div>
  ))
);

