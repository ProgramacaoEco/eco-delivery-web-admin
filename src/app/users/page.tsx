"use client";

import UserProvider from "./context/UserProvider";
import UsersComponent from "./UserComponent";

export default function Users() {
  return (
    <UserProvider>
      <UsersComponent />
    </UserProvider>
  );
}
