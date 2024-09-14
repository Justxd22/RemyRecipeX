import { FC, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import "../assets/stylesheets/Solution.css";

const Solution: FC = () => {
  const [suggestion, setSuggestion] = useState(null);
  const [position, setPosition]= useState()

  return (
    <APIProvider apiKey="">

    </APIProvider>
  );
};

export default Solution;
