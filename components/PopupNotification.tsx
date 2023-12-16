import {motion} from "framer-motion";

export function PopupNotification(props: { show: boolean, text: string}) {
	return <motion.div
		className={`noFilesNotification mt-2 text-sm text-white bg-neutral-500 p-2 rounded text-center`}
		initial={{opacity: 0}}
		animate={{
			opacity: props.show ? 1 : 0,
			y: props.show ? 0 : -3,
			display: "block",
			transitionEnd: {
				display: props.show ? "block" : "none",
			}
		}}

		transition={{duration: 0.3, ease: "easeInOut"}}
	>
		{props.text}
	</motion.div>;
}