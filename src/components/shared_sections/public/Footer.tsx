import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
    return (
        <div className="flex flex-col">
            <div className="grow bg-muted" />
            <footer className="border-t">
                <div className="max-w-(--breakpoint-xl) mx-auto">


                    <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
                        {/* Copyright */}
                        <span className="text-muted-foreground">
                            &copy; {new Date().getFullYear()}{" "}
                            <span>
                                Nasrullah Mansur
                            </span>
                            . All rights reserved.
                        </span>
                        <div className="flex items-center gap-5 text-muted-foreground">
                            <span>
                                <TwitterIcon className="h-5 w-5" />
                            </span>
                            <span>
                                <DribbbleIcon className="h-5 w-5" />
                            </span>
                            <span>
                                <TwitchIcon className="h-5 w-5" />
                            </span>
                            <span>
                                <GithubIcon className="h-5 w-5" />
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
