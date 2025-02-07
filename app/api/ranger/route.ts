import { NextResponse } from "next/server";
import moment from "moment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  // Parse the date or use current date
  const date = dateParam > "" ? moment.utc(dateParam) : moment.utc();
  const ranges = [];

  // Add month range if it's the first day of the month
  if (date.date() === 1) {
    ranges.push({
      label: "Month",
      date: date.toISOString(),
      after: date.clone().startOf("month").toISOString(),
      before: date.clone().endOf("month").toISOString(),
      year: date.year(),
      month: date.format("MMMM"),
      quarter: "",
    });
  }
  // If it's also the first day of a quarter, add quarter range
  if (date.date() === 1 && date.month() % 3 === 0) {
    ranges.push({
      label: "Quarter",
      date: date.toISOString(),
      after: date.clone().startOf("quarter").toISOString(),
      before: date.clone().endOf("quarter").toISOString(),
      year: date.year(),
      month: "",
      quarter: `Q${date.quarter()}`,
    });
  }
  // Add fiscal week range only if it's a Sunday
  if (date.day() === 0) {
    ranges.push({
      label: "Week",
      date: date.toISOString(),
      after: date.clone().startOf("day").toISOString(),
      before: date.clone().add(6, "days").endOf("day").toISOString(),
      year: date.year(),
      month: "",
      quarter: "",
      week: date.isoWeek(),
    });
  }

  return NextResponse.json(ranges);
}
