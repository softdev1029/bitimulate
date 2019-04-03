import React from "react";

import {
  Header,
  PageTemplate,
  PolyBackground,
  IntroQuestion
} from "components";

const HomePage = () => {
  return (
    <PageTemplate header={<Header />}>
      <PolyBackground>
        <IntroQuestion />
      </PolyBackground>
    </PageTemplate>
  );
};

export default HomePage;
