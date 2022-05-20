import React from "react";
import PropTypes from "prop-types";
import * as optimizelyReactSDK from "@optimizely/react-sdk";
import { OptimizelyProvider, createInstance } from "@optimizely/react-sdk";
import datafile from "../../assets/datafiles/datafile.json";

const isBrowser = typeof window !== "undefined";

const optimizely = optimizelyReactSDK.createInstance({
  datafile: isBrowser ? window.optimizelyDatafile : datafile,
});

class HelloWorld extends React.Component {
  render() {
    return (
      <OptimizelyProvider
        optimizely={optimizely}
        user={{ id: "default_user" }}
        isServerSide={!isBrowser}
      >
        <React.Fragment>Greeting: {this.props.greeting}</React.Fragment>

        <div>
          Welcome to our Quickstart Guide!
          <div>Hello</div>
          <ProductSort />
        </div>
      </OptimizelyProvider>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};

function ProductSort() {
  const [decision] = optimizelyReactSDK.useDecision("product_sort");
  const variationKey = decision.variationKey;
  const isEnabled = decision.enabled;
  const sortMethod = decision.variables["sort_method"];
  return (
    <div>
      {/* If variation is null, display error */}
      {variationKey === null && <div className="error">{decision.reasons}</div>}

      {/* If feature is enabled, do something with the Sort Method variable */}
      {isEnabled && <div>The Sort method is {sortMethod}</div>}

      {/* Show relevant component based on the variation key */}
      {variationKey === "control" && <div>Control Component</div>}
      {variationKey === "treatment" && <div>Treatment Component</div>}
      {variationKey}

      
    </div>
  );
}
export default HelloWorld;
