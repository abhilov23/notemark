/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { twMerge } from "tailwind-merge";
import { ComponentProps, forwardRef } from "react";

export const RootLayout = ({className, children, ...props}: ComponentProps<"main">)=>{
   
   return <main className={twMerge('flex flex-row h-screen ', className)} {...props}>
   {children}
    </main>
}


export const Sidebar = ({className, children, ...props}: ComponentProps<"aside">) => {
  return (
    <aside className={twMerge('w-[250px] mt-8 h-[100vh + 10px] overflow-auto', className)} {...props}> 
     {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, children, ...props}, ref) => (

    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}> 
        {children}
    </div>
));
Content.displayName = "Content";