import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "space-y-4 w-full",
        month_caption: "flex justify-center pt-1 relative items-center h-10",
        caption_label: "text-base font-bold text-foreground",
        nav: "flex items-center absolute right-0 top-0",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:text-coral transition-all",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:text-coral transition-all",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between mb-2",
        weekday:
          "text-muted-foreground rounded-md w-9 font-bold text-[0.8rem] uppercase",
        week: "flex w-full mt-2 justify-between",
        day: cn(
          "h-9 w-9 p-0 font-medium aria-selected:opacity-100 flex items-center justify-center rounded-xl transition-all hover:bg-coral/10 hover:text-coral cursor-pointer",
        ),
        selected:
          "bg-coral text-white hover:bg-coral hover:text-white focus:bg-coral focus:text-white font-bold shadow-md shadow-coral/20",
        today: "text-coral font-bold border-2 border-coral/20",
        outside:
          "text-muted-foreground opacity-30 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-20 cursor-not-allowed",
        hidden: "invisible",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          return orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...props} />
          ) : (
            <ChevronRight className="h-4 w-4" {...props} />
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
