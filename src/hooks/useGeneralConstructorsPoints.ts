import { formatString } from "@/util/formateRaceName";
import { ConstructorRacePoints } from "@/util/handleGeneralPageStats";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

export default function useGeneralConstructorsPoints({
  constructorChampionshipPoints,
}: {
  constructorChampionshipPoints: ConstructorRacePoints[];
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const { seriesSum, series } = React.useMemo(() => {
    const seriesSum: any[] = [];
    const series: any[] = [];

    constructorChampionshipPoints.forEach((team) => {
      let sum = 0;

      const teamDataSum = {
        name: `${team.teamName}`,
        data: [] as { x: string; y: number }[],
      };
      const teamData = {
        name: `${team.teamName}`,
        data: [] as { x: string; y: number }[],
      };

      team.races.forEach((race) => {
        teamDataSum.data.push({
          x: formatString(race.raceName),
          y: sum + Number(race.points),
        });

        teamData.data.push({
          x: formatString(race.raceName),
          y: Number(race.points),
        });

        sum = sum + Number(race.points);
      });

      seriesSum.push(teamDataSum);
      series.push(teamData);
    });

    return {
      seriesSum,
      series,
    };
  }, [constructorChampionshipPoints]);

  const options = {
    chart: {
      id: "general-race-points-constructors",
    },
    stroke: {
      curve: "straight",
    },
    colors: [
      "#FF5733",
      "#33FF57",
      "#FF3333",
      "#FF33A1",
      "#A133FF",
      "#33FFF6",
      "#F6FF33",
      "#FFA133",
      "#3357FF",
      "#33FFA5",
    ],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "",
      style: {
        fontSize: "18px",
        color: darkMode ? "#ffffff" : "#585858",
      },
    },
    subtitle: {
      text: "Points To Date",
      style: {
        fontSize: "12px",
        color: darkMode ? "#7c7c7c" : "#7c7c7c",
      },
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
      padding: {
        bottom: 40,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "50%",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9b9b9b",
          fontSize: "14px",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "#9b9b9b",
          fontSize: "14px",
        },
      },
    },
    legend: {
      labels: {
        colors: darkMode ? "#7c7c7c" : "#7c7c7c",
      },
    },
  };

  options.title.text = `Team Constructors Points`;

  return {
    options,
    series,
    seriesSum,
  };
}
