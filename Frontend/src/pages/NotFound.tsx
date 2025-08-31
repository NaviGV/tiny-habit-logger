import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-destructive">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Page Not Found</p>
      <p className="mt-2 text-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Button className="mt-6 ">
        <Link to="/">Return to Home</Link>
      </Button>
      
    </div>
  </div>
);

export default NotFound;
