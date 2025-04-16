import SideMenuMobile from "./Components/SideMenu/Sidemenu";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <SideMenuMobile open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div className="container justify-content-center text-center mt-5">
        <h1 className="display-5">Hola soy un componente</h1>
      </div>
    </>
  );
};

export default App;
