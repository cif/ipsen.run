import { NextResponse } from "next/server";

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function getQuarterRange(year: number, month: number) {
  const quarterStartMonth = Math.floor(month / 3) * 3;
  const quarter = Math.floor(month / 3) + 1;
  return {
    Label: `Q${quarter}`,
    After: new Date(year, quarterStartMonth, 1).toISOString(),
    Before:
      getLastDayOfMonth(year, quarterStartMonth + 2)
        .toISOString()
        .split("T")[0] + "T23:59:59.999Z",
    Year: year,
    Month: null,
    Quarter: `Q${quarter}`,
    Week: null,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  // Parse the date or use current date
  const targetDate = dateParam ? new Date(dateParam) : new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const ranges = [];

  // Add month range if it's the first day of the month
  if (targetDate.getDate() === 1) {
    ranges.push({
      Label: new Date(year, month).toLocaleString("en-US", { month: "long" }),
      After: new Date(year, month, 1).toISOString(),
      Before:
        new Date(year, month + 1, 0).toISOString().split("T")[0] +
        "T23:59:59.999Z",

      Year: year,
      Month: month + 1,
      Quarter: null,
      Week: null,
    });

    // If it's also the first day of a quarter, add quarter range
    if (month % 3 === 0) {
      ranges.push(getQuarterRange(year, month));
    }
  }

  // Add fiscal week range only if it's a Sunday
  if (targetDate.getDay() === 0) {
    // Calculate the fiscal week number
    const startOfYear = new Date(year, 0, 1);
    const days = Math.floor(
      (targetDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
    );
    const fiscalWeek = Math.ceil((days + startOfYear.getDay() + 1) / 7);

    const weekEnd = new Date(targetDate);
    weekEnd.setDate(weekEnd.getDate() + 6); // Add 6 days to get to Saturday

    ranges.push({
      Label: `Week ${fiscalWeek}`,
      After: targetDate.toISOString(),
      Before: weekEnd.toISOString().split("T")[0] + "T23:59:59.999Z",
      Year: year,
      Month: null,
      Quarter: null,
      Week: fiscalWeek,
    });
  }

  return NextResponse.json(ranges);
}
