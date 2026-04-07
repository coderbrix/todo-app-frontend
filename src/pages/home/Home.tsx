import Component1 from "./components/component1/component1"
import Markdown from "./components/markdown/Markdown"
import Layout from "../../components/Layout/Layout"
import Navbar from "../../components/Layout/Navbar"


const Home = () => {
  return (
    <div>
      homepage
      <Markdown/>
      <Component1/>
  
      <Layout/>
    </div>
  )
}

export default Home


