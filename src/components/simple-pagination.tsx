import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem
} from "@/components/ui/pagination";

type ILinks = {
    active: boolean;
    label: string;
    page: number | null;
    url: string | null;
}

export default function SimplePaginate({ links, onClick }: { links: ILinks[], onClick: (n: number) => void }) {

    const setLabel = (label: string) => {
        if (label == "&laquo; Previous") {
            return "Prev";
        }
        else if (label == "Next &raquo;") {
            return "Next"
        }
        else {
            return label;
        }
    }

    return (

        <>
            {links.length > 3 &&
                <Pagination className="py-6">
                    <PaginationContent>
                        {links.map((link, index: number) => (
                            <PaginationItem key={index}>
                                <Button onClick={() => onClick(link.page ? link.page : 1)} disabled={link.active || !link.page} className="cursor-pointer">{setLabel(link.label)}</Button>
                            </PaginationItem>
                        ))}

                    </PaginationContent>
                </Pagination>

            }
        </>

    )
}
