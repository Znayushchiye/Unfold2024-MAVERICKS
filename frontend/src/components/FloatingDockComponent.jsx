import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Tooltip, Fab, Card } from "@mui/material";

export function DockBar({ setDashboardState }) {
   const items = [
      {
         title: "Share",
         icon: <ShareIcon />,
         state: "share",
         stateFunction: setDashboardState,
      },
      {
         title: "Edit",
         icon: <EditIcon />,
         state: "edit",
         stateFunction: setDashboardState,
      },
      {
         title: "Access List",
         icon: <ReorderIcon />,
         state: "access_list",
         stateFunction: setDashboardState,
      },
   ];
   return (
      <Card>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            {items.map((item) => (
               <Tooltip title={item.title} key={item.state}>
                  <Fab size="medium" aria-label={item.title} onClick={setDashboardState(item.state)} key={item.state}>
                     {item.icon}
                  </Fab>
               </Tooltip>
            ))}
         </div>
      </Card>
   );
}