import { NextResponse } from "next/server";

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function getQuarterRange(year: number, month: number) {
  const quarterStartMonth = Math.floor(month / 3) * 3;
  const quarter = Math.floor(month / 3) + 1;
  return {
    label: `Q${quarter}`,
    after: new Date(year, quarterStartMonth, 1).toISOString(),
    before:
      getLastDayOfMonth(year, quarterStartMonth + 2)
        .toISOString()
        .split("T")[0] + "T23:59:59.999Z",
    year: year,
    month: null,
    quarter: `Q${quarter}`,
    week: null,
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
      label: new Date(year, month).toLocaleString("en-US", { month: "long" }),
      after: new Date(year, month, 1).toISOString(),
      before:
        new Date(year, month + 1, 0).toISOString().split("T")[0] +
        "T23:59:59.999Z",
      year: year,
      month: month + 1,
      quarter: null,
      week: null,
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
      label: `Week ${fiscalWeek}`,
      after: targetDate.toISOString(),
      before: weekEnd.toISOString().split("T")[0] + "T23:59:59.999Z",
      year: year,
      month: null,
      quarter: null,
      week: fiscalWeek,
    });
  }

  return NextResponse.json(ranges);
}
