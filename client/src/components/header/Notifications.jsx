import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const notifications = [
  {
    id: 1,
    title: "Low stock alert",
    description: "Product 'Wireless Headphones' is running low on stock.",
    date: new Date(),
    read: false,
  },
  {
    id: 2,
    title: "New message",
    description: "You have a new message from the support team",
    date: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: 3,
    title: "Order shipped",
    description: "Your order #12345 has been shipped",
    date: new Date(Date.now() - 86400000),
    read: true,
  },
];

const Notifications = () => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 max-h-96"
        align="end"
        sideOffset={10}>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`cursor-pointer p-3 ${
                  !notification.read ? "bg-accent/50" : ""
                }`}>
                <div className="flex items-start gap-3 w-full">
                  <span
                    className={`rounded-full p-2 ${
                      !notification.read ? "bg-primary/10" : "bg-muted"
                    }`}>
                    <Bell
                      className={`h-4 w-4 ${
                        !notification.read
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </span>
                  <div className="grid gap-1 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        !notification.read ? "text-primary" : ""
                      }`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(notification.date)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
