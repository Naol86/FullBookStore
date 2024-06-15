import NavBar from "../NavBar/NavBar";

function UserLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default UserLayout;
