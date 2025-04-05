import Notifications from "./header/Notifications";
import SearchBar from "./header/SearchBar";
import AccountMenu from "./header/AccountMenu";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/add-product");
    toast.success("Add new product clicked");
  };

  const handleAddOrder = () => {
    navigate("/add-order");
    toast.success("Add new order clicked");
  };
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="relative flex-1 max-w-2xl">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant={"outline"}
          onClick={handleAddOrder}
          className="border-red-500 rounded-full text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-500">
          <PlusCircle color="red" className=" h-4 w-4 " />
          Add Order
        </Button>
        <Button
          variant={"outline"}
          onClick={handleAddProduct}
          className="border-blue-500 rounded-full text-blue-500 bg-blue-50 hover:bg-blue-100 hover:text-blue-500">
          <PlusCircle className=" h-4 w-4" />
          Add Product
        </Button>
        {/* <Notifications /> */}
        <AccountMenu />
      </div>
    </header>
  );
};

export default Header;
