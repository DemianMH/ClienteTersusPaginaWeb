import Loyout from "./layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Inicio from "@/app/components/Inicio";




export default function Home() {
  return (
    <Loyout title="Inicio">
      <Nav />
      <Inicio />
      <Footer/>
    </Loyout>
  );
}