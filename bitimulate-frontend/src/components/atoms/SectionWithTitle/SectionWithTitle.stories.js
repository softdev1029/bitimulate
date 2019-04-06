import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import SectionWithTitle from "./SectionWithTitle";

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf("SectionWithTitle", module).add("with text", () => (
  <SectionWithTitle title="Section Title">Hello Option</SectionWithTitle>
));