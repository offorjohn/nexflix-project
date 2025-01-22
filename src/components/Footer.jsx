const Footer = () => {
	return (
		<footer className="py-6 md:px-8 md:py-0 bg-black text-white" style={{ borderTop: "10px solid #1f2937" }}>
			<div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left font-bold">
					All rights reserved Mazaia | 2025
				</p>
			</div>
		</footer>
	);
};

export default Footer;
