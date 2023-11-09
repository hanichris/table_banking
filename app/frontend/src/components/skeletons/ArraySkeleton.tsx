import { Skeleton } from "@mui/material";

export default function ArraySkeleton() {
  return (
    (Array.from({length: 10}, (_, idx) => ++idx).map(id => (
      <tr key={id}>
        <td className="skeleton-item"><Skeleton animation="pulse" sx={{fontSize: '2rem'}}/></td>
      </tr>
    ))
  ));
}