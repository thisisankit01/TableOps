import { useEffect } from "react";

export const useInfiniteScroll = (
  scrollRef: React.RefObject<HTMLDivElement>,
  onScrollEnd: () => void
) => {
  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = scrollRef.current;
      if (!tableContainer) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = tableContainer;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        onScrollEnd();
      }
    };

    const tableContainer = scrollRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onScrollEnd, scrollRef]);
};
