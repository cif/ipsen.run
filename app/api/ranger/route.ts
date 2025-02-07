import { NextResponse } from "next/server";
import moment from "moment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  // Parse the date or use current date
  const targetDate = dateParam > "" ? moment.utc(dateParam) : moment.utc();
  const ranges = [];

  // Add month range if it's the first day of the month
  if (targetDate.date() === 1) {
    ranges.push({
      label: "Month",
      targetDate: targetDate.toISOString(),
      after: targetDate.clone().startOf("month").toISOString(),
      before: targetDate.clone().endOf("month").toISOString(),
      year: targetDate.year(),
      month: targetDate.format("MMMM"),
      quarter: "",
    });
  }
  // If it's also the first day of a quarter, add quarter range
  if (targetDate.date() === 1 && targetDate.month() % 3 === 0) {
    ranges.push({
      label: "Quarter",
      targetDate: targetDate.toISOString(),
      after: targetDate.clone().startOf("quarter").toISOString(),
      before: targetDate.clone().endOf("quarter").toISOString(),
      year: targetDate.year(),
      month: "",
      quarter: `Q${targetDate.quarter()}`,
    });
  }
  // Add fiscal week range only if it's a Sunday
  if (targetDate.day() === 0) {
    ranges.push({
      label: "Week",
      targetDate: targetDate.toISOString(),
      after: targetDate.clone().startOf("day").toISOString(),
      before: targetDate.clone().add(6, "days").endOf("day").toISOString(),
      year: targetDate.year(),
      month: "",
      quarter: "",
      week: targetDate.isoWeek(),
    });
  }

  return NextResponse.json(ranges);
}
