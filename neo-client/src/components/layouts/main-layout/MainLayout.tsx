import { PropsWithChildren } from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";





export function MainLayout({children}:PropsWithChildren){
    return <div className="flex  flex-col h-full">
        <div className="flex-1">
            <Header/>
            <main className="mx-5 lg:mx-14">{children}</main>
            <Footer/>
        </div>
    </div>
}