import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children}){
    return(
        <div className="">
            <main className="">{children}</main>
        </div>
    )
}