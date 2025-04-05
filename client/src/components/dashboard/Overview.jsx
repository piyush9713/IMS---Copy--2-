import { salesData } from "../../lib/data";

export default function Overview() {
  return (
    <div className="h-[200px] w-full">
      {/* Chart would go here - using a placeholder */}
      <div className="flex h-full items-end  gap-2 pb-4">
        {salesData.map((data, i) => (
          <div
            key={i}
            className="bg-primary/90 rounded-t w-full"
            style={{
              height: `${(data.sales / 30000) * 100}%`,
            }}>
            <div className="w-full h-full relative group">
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs rounded px-2 py-1 mb-1 whitespace-nowrap transition-opacity">
                {data.month}: ${data.sales}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        {salesData.map((data, i) => (
          <div key={i}>{data.month}</div>
        ))}
      </div>
    </div>
  );
}
