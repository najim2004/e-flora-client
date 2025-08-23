// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useMemo } from "react";
// import { CropSuggestionHistory as corpHistory } from "@/redux/features/cropSuggestions/cropSuggestionSlice";
// interface CropSuggestionHistoryProps {
//   history: corpHistory[];
//   router: ReturnType<typeof useRouter>;
//   handleToggleHistory: () => void;
//   handleLoadMore: () => void;
// }

// const CropSuggestionHistory: React.FC<CropSuggestionHistoryProps> = ({
//   history,
//   router,
//   handleToggleHistory,
//   handleLoadMore,
// }) => {
//   const sortedHistory = useMemo(() => {
//     return [...history].sort((a, b) => {
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     });
//   }, [history]);

//   return (
//     <div className="space-y-3">
//       {sortedHistory.map((item) => (
//         <Card
//           onClick={() => {
//             router.push(`/crop-suggestions?id=${item._id}`);
//             handleToggleHistory();
//           }}
//           key={item._id}
//           className="bg-white hover:shadow-md transition p-4 rounded-xl border border-muted"
//         >
//           <div className="flex justify-between items-center mb-1">
//             <div className="text-sm text-primary font-medium flex items-center gap-1">
//               📍 {item.location.latitude}, {item.location.longitude}
//             </div>
//             <div className="text-xs text-muted-foreground">
//               {new Date(item.createdAt).toLocaleString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//               })}
//             </div>
//           </div>
//           <div className="text-xs text-muted-foreground">
//             Soil:{" "}
//             <span className="font-medium text-foreground">{item.soilType}</span>
//             , Size: <span className="font-medium">{item.farmSize} acres</span>,
//             Irrigation:{" "}
//             <span className="font-medium">{item.irrigationAvailability}</span>
//           </div>
//         </Card>
//       ))}
//       <Button
//         onClick={handleLoadMore}
//         size="sm"
//         variant="outline"
//         className="w-full mt-2 text-primary"
//       >
//         Load More
//       </Button>
//     </div>
//   );
// };

// export default CropSuggestionHistory;
