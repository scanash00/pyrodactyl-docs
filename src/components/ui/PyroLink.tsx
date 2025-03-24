import Link from "next/link";

export const PyroLink = ({
	href,
	external = false,
	className = "text-brand",
	children,
	...props
}: {
	href: string;
	external?: boolean;
	className?: string;
	children: React.ReactNode;
}) => (
	<Link 
		data-pyro-ui="link" 
		href={href} 
		className={className}
		{...external && {
			target: "_blank",
			rel: "noopener noreferrer"
		}}
		{...props}
	>
		{children}
	</Link>
);
