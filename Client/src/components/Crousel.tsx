import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import suggestion1 from "../assets/images/suggestion1.png";
import suggestion2 from "../assets/images/suggestion2.png";
import suggestion3 from "../assets/images/suggestion3.png";
import suggestion4 from "../assets/images/suggestion4.png";
import suggestion5 from "../assets/images/suggestion5.png";
import suggestion6 from "../assets/images/suggestion6.png";
import suggestion7 from "../assets/images/suggestion7.png";
import suggestion8 from "../assets/images/suggestion8.png";

const suggestions = [
  { title: "Chicken", image: suggestion1 },
  { title: "Sour", image: suggestion2 },
  { title: "Bacon", image: suggestion3 },
  { title: "Rice", image: suggestion4 },
  { title: "Pasta", image: suggestion5 }, // Add more suggestions as needed
  { title: "Salad", image: suggestion6 },
  { title: "Burger", image: suggestion7 },
  { title: "Pizza", image: suggestion8 },
];

const SuggestionsCarousel: React.FC = () => {

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[60%] 2xl:w-[80%] mx-auto max-h-96 2xl:pb-20 bg-gradient-to-t from-[rgba(238,171,117,0.8)] to-[rgba(194,180,134,0.0)] shadow-[0_12px_12px_rgba(0,0,0,0.1)]"
    >
      <CarouselContent>
        {suggestions.map((suggestion, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5 2xl:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-6 md:text-2xl font-courgette  font-semibold mb-2 text-center text-[#fde6b5]">
                    {suggestion.title}
                  </p>
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="aspect-square object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SuggestionsCarousel;
