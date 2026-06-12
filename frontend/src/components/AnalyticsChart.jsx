import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AnalyticsChart({ results }) {

  const data = results
    .slice()
    .reverse()
    .map((result, index) => ({
      interview: index + 1,

      score: result.percentage,

      date: new Date(
        result.createdAt
      ).toLocaleDateString(),
    }));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

      <h2 className="text-2xl font-bold mb-6">
        Performance Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="interview"
            />

            <YAxis
              domain={[0, 100]}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Score",
              ]}
              labelFormatter={(
                label,
                payload
              ) =>
                `Interview ${label} • ${
                  payload?.[0]?.payload
                    ?.date || ""
                }`
              }
            />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#64748b"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-6 flex gap-8">

        <div>
          <p className="text-slate-500">
            Total Interviews Given
          </p>

          <p className="font-bold text-xl">
            {results.length}
          </p>
        </div>

        <div>
          <p className="text-slate-500">
            Most Recent Score
          </p>

          <p className="font-bold text-xl">
            {results.length > 0
              ? results[0]
                  .percentage
              : 0}
            %
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalyticsChart;