export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DriverResults {
  id: string;
  results: [
    {
      Results: [
        {
          position: string;
          positionText: string;
          points: string;
          grid: string;
          status: string;
          Time: {
            time: string;
            millis: string;
          };
          FastestLap: {
            AverageSpeed: {
              speed: string;
            };
          };
          Driver: {
            nationality: string;
            dateOfBirth: string;
            permanentNumber: string;
            givenName: string;
            familyName: string;
          };
          Constructor: {
            constructorId: string;
          };
        },
      ];
      Circuit: {
        circuitId: string;
      };
      raceName: string;
    },
  ];
}

export interface QualyResults {
  id: string;
  Races: [
    {
      QualifyingResults: [
        {
          position: string;
          Driver: {
            nationality: string;
            dateOfBirth: string;
            permanentNumber: string;
            givenName: string;
            familyName: string;
          };
        },
      ];
      Circuit: {
        circuitId: string;
      };
      raceName: string;
    },
  ];
}
