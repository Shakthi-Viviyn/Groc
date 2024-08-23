
function NavBar() {
  return (
    <div className="navbar flex justify-between items-center px-6 w-full bg-slate-200 rounded-lg shadow-lg">
      <h1 className="font-mono text-2xl">Groc</h1>
      <div className="flex gap-5 h-full">
        <button className="bg-slate-300 py-1 px-4 font-mono"><span className="text-lg">Add Bill</span></button>
        <button className="bg-slate-300 py-1 px-4 font-mono"><span className="text-lg">Log out</span></button>
      </div>
    </div>
  );
}

export default NavBar;