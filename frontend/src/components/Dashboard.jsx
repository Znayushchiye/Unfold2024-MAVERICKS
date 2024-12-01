import { useState } from "react";
import { FloatingDockBar } from "./FloatingDockComponent";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Navbar from "./Navbar";

const url = "";

const dialogTitleMap = {
   'share': 'Enter the Email Address',
   'edit': 'Edit details',
   'access_list': 'Shared Email Addresses',
}

const ShareComponent = () => {

}

const EditComponent = () => {

}

const AccessListComponent = () => {
   const data = await axios.get('http://localhost:5000/access/list');

   return (
      <div>

      </div>
   )
}

const dialogContentMap = {
   'share': <ShareComponent />,
   'edit': <EditComponent />,
   'access_list': <AccessListComponent />,
}


const EnterDetailsComponent = () => {
   return <></>;
};

const WelcomeComponent = () => {
   const [dashboardState, setDashboardState] = useState("home");
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <div className="image">
            <div className="nft">
               <image src={url}></image>
            </div>
            <div className="options">
               <FloatingDockBar setDashboardState={setDashboardState} />
            </div>
         </div>
         {["share", "edit", "access_list"].includes(dashboardState) && (
            <Dialog>
               <DialogTitle>
                  {dialogTitleMap[dashboardState]}
               </DialogTitle>
               <DialogContent>
                  {dialogContentMap[dashboardState]}
               </DialogContent>
            </Dialog>
         )}
      </div>
   );
};

export const DashboardComponent = ({ isSignUp }) => {
   console.log("Welcome Component");

   return <>
      <Navbar />
      {isSignUp ? <EnterDetailsComponent /> : <WelcomeComponent />}
   </>;
};
