import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import SelectCurrency from "./SelectCurrency";

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf("SelectCurrency", module).add("with text", () => (
  <SelectCurrency >Hello Option</SelectCurrency>
));
