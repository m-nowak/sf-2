import ModeToggle from "./mode-toggle";

const Header = ({ title, nav }: { title: string; nav: React.ReactNode }) => {
  return (
    <div className="sticky top-0 bg-background pt-2 z-40">
      <div className="header">
        <div>{title}</div>
        <div className="header-right">
          <ModeToggle />
        </div>
      </div>
      {nav}
    </div>
  );
};

export default Header;
