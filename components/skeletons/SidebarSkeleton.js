import { Skeleton } from "@material-ui/lab";
import React from "react";

function SidebarSkeleton() {
  return (
    <div className="bg-white p-2 rounded-md">
      <div className="mb-3">
        <Skeleton animation="wave" variant="rect" width="60%" height={25} />
      </div>

      <div className="mb-3">
        <Skeleton animation="wave" variant="rect" width="90%" height={15} />
      </div>

      <div className="mb-3">
        <Skeleton animation="wave" variant="rect" width="90%" height={15} />
      </div>

      <div className="mb-3">
        <Skeleton animation="wave" variant="rect" width="90%" height={15} />
      </div>
    </div>
  );
}

export default SidebarSkeleton;
