import SignIn from "@/components/sign-in";


export default function Home() {
  return (
    <>
    <div className="bg-slate-900 text-white h-screen flex">
       <div className="mx-auto"> home </div>
       
        <div className="mx-auto">
          <SignIn/>
        </div>
        
    </div>

    </>
  );
}
