import { useEffect, useRef } from "react"

export const useDimensions = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0});

  useEffect(() => {
    dimensions.current.width = ref?.current?.offsetWidth as number;
    dimensions.current.height = ref?.current?.offsetHeight as number;
    console.log(dimensions.current.height)
  }, [ref]);

  return dimensions.current;
}