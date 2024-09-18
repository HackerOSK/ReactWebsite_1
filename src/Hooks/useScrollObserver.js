import { useEffect, useState, useRef } from "react";

const useScrollObserver = () => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 } // Trigger when 10% of the element is visible
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return { isVisible, elementRef };
};

export default useScrollObserver;
