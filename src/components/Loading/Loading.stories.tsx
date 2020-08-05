import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import { Loading } from "./Loading";

const stories = storiesOf("Circular Loading", module);

stories.add(
  "isLoading set to true",
  withInfo({ inline: true })(() => <Loading isLoading={true} />)
);

stories.add(
  "size prop",
  withInfo({ inline: true })(() => (
    <>
      <Loading size="small" isLoading={true} />
      <Loading isLoading={true} />
      <Loading size="big" isLoading={true} />
    </>
  ))
);

stories.add(
  "color prop",
  withInfo({ inline: true })(() => (
    <>
      <Loading color="red" size="small" isLoading={true} />
      <Loading color="blue" isLoading={true} />
      <Loading color="green" size="big" isLoading={true} />
    </>
  ))
);
