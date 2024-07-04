import Navbar from "@/components/shared/navbar"



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" max-w-full mx-auto px-5" >



      <div >
        <Navbar />
        <div >
          {children}
        </div>
      </div>

    </main>
  )
}

export default Layout