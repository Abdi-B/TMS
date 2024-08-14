import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

const usePreviousLocation = () => {
  const location = useLocation();
  const previousLocation = useRef(location.pathname);

  useEffect(() => {
    previousLocation.current = location.pathname;
  }, [location]);

  return previousLocation.current;
};

export default usePreviousLocation;
