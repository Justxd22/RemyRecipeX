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
interface SuggestionsCarouselProps {
  getVisibleSuggestions: () => { title: string; image: string }[];
}

const suggestions = [
  { title: "Chicken Maratha", image: suggestion1 },
  { title: "Sweet & Sour", image: suggestion2 },
  { title: "Bacon", image: suggestion3 },
  { title: "Rice", image: suggestion4 },
  { title: "Pasta", image: suggestion5 }, // Add more suggestions as needed
  { title: "Salad", image: suggestion6 },
  { title: "Burger", image: suggestion7 },
  { title: "Pizza", image: suggestion8 },
];

const SuggestionsCarousel: React.FC<SuggestionsCarouselProps> = () => {

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {suggestions.map((suggestion, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {suggestion.title}
                  </h3>
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
