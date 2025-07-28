import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";




export function HeaderCard(){
    return <Sheet>
        <SheetTrigger asChild>
            <Button variant='ghost' className='cursor-pointer'>Basket</Button>
        </SheetTrigger>
        <SheetContent>
            <Heading title="Basket of goods" className="text-xl" />
        </SheetContent>
    </Sheet>
}