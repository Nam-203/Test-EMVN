import SidebarComponent from "../SideBarComponent/SidebarComponent";

const DefaultComponent = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SidebarComponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
