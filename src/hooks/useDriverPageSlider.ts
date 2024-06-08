import { DriverResults } from "@/interfaces/interfaces";
import calculateAge from "@/util/calculateAge";

export default function useDriverPageSlider(
  driverResults: DriverResults | null
) {
  if (!driverResults) return null;

  const totalPoints = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].points),
    0
  );

  const positionSum = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].position),
    0
  );

  const gridSum = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].grid),
    0
  );

  const speedSum = driverResults?.results.reduce((acc, result) => {
    if (result.Results[0]?.FastestLap?.AverageSpeed) {
      return acc + Number(result.Results[0]?.FastestLap?.AverageSpeed.speed);
    } else {
      return acc;
    }
  }, 0);

  const speedLength = driverResults?.results.reduce((acc, result) => {
    if (result.Results[0]?.FastestLap?.AverageSpeed?.speed) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const racesFinished = driverResults?.results.reduce((acc, result) => {
    if (result.Results[0]?.position === result.Results[0]?.positionText) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const averageFinishing = positionSum / driverResults?.results.length;

  const averageStartingGrid = gridSum / driverResults?.results.length;

  const averageSpeed = speedSum / speedLength;

  return [
    {
      title: "Total Points",
      value: totalPoints,
      imgUrl: "/totalPoints.svg",
      textColour: "#facc15",
      bgColour: "#fef5e5",
    },
    {
      title: "Avg Starting",
      value: averageStartingGrid,
      imgUrl: "/avgStarting.svg",
      textColour: "#60a5fa",
      bgColour: "#eaf0ff",
    },
    {
      title: "Avg Finishing",
      value: averageFinishing,
      imgUrl: "/avgFinishing.svg",
      textColour: "#f87171",
      bgColour: "#fdede8",
    },
    {
      title: "Avg Speed",
      value: `${Math.round(averageSpeed)} kph`,
      imgUrl: "/avgSpeed.svg",
      textColour: "#facc15",
      bgColour: "#fef5e5",
    },
    {
      title: "Races Finished",
      value: `${racesFinished} of ${driverResults?.results.length}`,
      imgUrl: "/racesFinished.svg",
      textColour: "#f472b6",
      bgColour: "#ffeefd",
    },
    {
      title: "Nationality",
      value: driverResults.results[0].Results[0].Driver.nationality,
      imgUrl: "/earth.svg",
      textColour: "#4ade80",
      bgColour: "#e6fffa",
    },
    {
      title: "Age",
      value: calculateAge(
        driverResults.results[0].Results[0].Driver.dateOfBirth
      ),
      imgUrl: "/cake.svg",
      textColour: "#60a5fa",
      bgColour: "#eaf0ff",
    },
    {
      title: "Car Number",
      value: driverResults.results[0].Results[0].Driver.permanentNumber,
      imgUrl: "/hashtag.svg",
      textColour: "#f472b6",
      bgColour: "#ffeefd",
    },
  ];
}
