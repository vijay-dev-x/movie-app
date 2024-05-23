import { useRef } from "react";
import Card from "./Card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function MovieCard({ movieData, catagory, type, tranding }) {
  const containerRef = useRef();

  const leftSideHandler = () => {
    containerRef.current.scrollLeft -= 300;
  };

  const rightSideHandler = () => {
    containerRef.current.scrollLeft += 300;
  };

  return (
    <div className="mx-auto relative overflow-hidden mb-2 p-5">
      <h2 className="text-3xl mb-5 font-semibold">{catagory}</h2>
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="grid transition-all no-scrollbar scroll-smooth items-center overflow-x-scroll grid-flow-col grid-cols-[repeat(auto-fit,220px)] gap-5"
        >
          {movieData?.map((value, index) => (
            <Card
              key={index}
              tranding={tranding}
              value={value}
              type={type}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="flex h-full items-center justify-between w-full absolute top-0 px-8">
        <button
          onClick={leftSideHandler}
          className="p-2 z-40    backdrop-blur-sm bg-black/30 text-white rounded-full"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={rightSideHandler}
          className="p-2 z-40 mr-5 backdrop-blur-sm bg-black/30 text-white rounded-full"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
