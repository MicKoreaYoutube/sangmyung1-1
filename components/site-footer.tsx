import Link from "next/link"
import Image from "next/image"

import { LogAboutItem, NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Instagram } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t font-RixInooAriDuriR">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image src={siteConfig.logo} className="h-8 mr-3" alt="sangmyung1-1 Logo" />
                            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">상명중1-1 건의함</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:gap-20 md:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">법 관련</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/terms" className="hover:underline hover:text-dark">이용약관</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">게시판</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/board/announcements" className="hover:underline hover:text-dark">공지사항</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/board/suggestions" className="hover:underline hover:text-dark">건의 게시판</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">개발</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="https://github.com/MicKoreaYoutube/sangmyung1-1" className="hover:underline hover:text-dark">깃허브</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/releaseNote" className="hover:underline hover:text-dark">릴리스 노트</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        ⓒ 2023 이준영. all rights reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.gitHub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Link
                            href={siteConfig.links.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Instagram />
                                <span className="sr-only">Instagram</span>
                            </div>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    )
}
