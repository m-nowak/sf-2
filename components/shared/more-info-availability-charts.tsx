import React from "react";

interface DurationItem {
  duration: number;
  DownTimeL3: string;
}

interface DurationPercentageConverterProps {
  data: DurationItem[];
}

const MoreInfoAvailabilityCharts = ({
  data,
}: DurationPercentageConverterProps) => {
  const colors = [
    [["#E94B54"], ["#F08700"], ["#ACCC58"], ["#FBDA00"], ["#999E9C"]],
  ];

  const maxDuration = Math.max(...data.map((item) => item.duration));

  const normalizedData = data.map((item) => ({
    ...item,
    percentage: (item.duration / maxDuration) * 100,
  }));
  return (
    <div>
      {normalizedData.length > 0 ? (
        normalizedData.map((info: any, idx: number) => (
          <div key={info.DownTimeL3} className="flex items-center  ">
            <div className="min-w-20">{info.duration}h</div>
            <div
              className={`relative my-2 h-16 rounded-sm transition-all ease-in-out delay-500`}
              style={{
                width: `${info.percentage}%`,
                backgroundColor: `${colors[0][idx]}`,
              }}
            >
              <div className="absolute top-3 left-5 w-[320px] p-1 text-xl font-semibold">
                {info.DownTimeL3}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-14 text-center">
          No data for this assset.
          <br />( It can be new machine)
        </div>
      )}
    </div>
  );
};

export default MoreInfoAvailabilityCharts;
