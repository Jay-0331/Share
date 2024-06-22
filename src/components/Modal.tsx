'use client'

import React, { useState } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	IconDefinition,
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
	faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ShareIcon } from 'lucide-react'

type shareIconProps = {
	name: string
	icon: IconDefinition
	onHoverColor: string
}

const icons: shareIconProps[] = [
	{ name: 'facebook', icon: faFacebookF, onHoverColor: 'hover:bg-blue-600' },
	{ name: 'twitter', icon: faXTwitter, onHoverColor: 'hover:bg-neutral-900' },
	{ name: 'whatsapp', icon: faWhatsapp, onHoverColor: 'hover:bg-green-500' },
	{ name: 'linkedin', icon: faLinkedinIn, onHoverColor: 'hover:bg-blue-800' },
	{ name: 'link', icon: faLink, onHoverColor: 'hover:bg-gray-400' },
]

export const Modal = () => {
	const [currentURL, setCurrentURL] = useState<string>()
	const messageRef = React.useRef<HTMLTextAreaElement>(null)
	const handleclick = (name: string) => {
		if (name === 'link') {
			navigator.clipboard.writeText(currentURL as string)
			toast.success('Link copied to clipboard')
			return
		}
		toast.info(
			`redirecting to ${name} with message: ${messageRef.current?.value}`,
		)
	}

	React.useEffect(() => {
		setCurrentURL(window.location.href)
	}, [])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex space-x-2">
					<ShareIcon className="h-4 w-4" />
					<span>Share</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-sm space-y-2">
				<DialogHeader>
					<DialogTitle>Share</DialogTitle>
					<DialogDescription className="flex flex-col">
						<span>Share this with your connections</span>
						<span className="px-3 py-2 mt-2 bg-neutral-100 rounded-lg text-center">
							{currentURL}
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-start space-x-2">
					{icons.map((v, i) => {
						return (
							<DialogClose
								key={i}
								asChild
							>
								<Button
									variant={'secondary'}
									onClick={() => handleclick(v.name)}
									className={cn(
										'rounded-full h-15 aspect-square hover:text-white',
										v.onHoverColor,
									)}
								>
									<FontAwesomeIcon
										icon={v.icon}
										className={`h-7 w-7`}
									/>
								</Button>
							</DialogClose>
						)
					})}
				</div>
				<div>
					<Textarea
						ref={messageRef}
						defaultValue={'Happy to offer you Internship 🎉🎉'}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
