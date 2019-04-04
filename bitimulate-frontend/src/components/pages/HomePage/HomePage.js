import React from "react";

import { PageTemplate, PolyBackground, IntroQuestion } from "components";
import HeaderContainer from "containers/HeaderContainer";

const HomePage = () => {
  return (
    <PageTemplate header={<HeaderContainer />}>
      <PolyBackground>
        <IntroQuestion />
      </PolyBackground>
    </PageTemplate>
  );
};

export default HomePage;
