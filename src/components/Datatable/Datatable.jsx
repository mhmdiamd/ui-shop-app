// import React, { useEffect } from 'react';

// export const Datatable = ({ children, tableHead, loading }) => {
//   useEffect(() => {}, []);

//   return (
//     <table id="table" className="table align-items-center justify-content-center mb-0">
//       <thead>
//         <tr>
//           <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
//           {tableHead?.map((attr, i) => (
//             <th key={i} className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
//               {attr}
//             </th>
//           ))}
//           <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Operation</th>
//         </tr>
//       </thead>
//       <tbody>{children}</tbody>
//     </table>
//   );
// };
