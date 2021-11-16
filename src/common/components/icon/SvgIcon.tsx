import { useEffect, useState } from 'react';

type SvgIconProps = {
    svgString: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
};

export const SvgIcon = ({ svgString, className, onError, onLoad }: SvgIconProps): JSX.Element => {
    const [isFailed, setIsFailed] = useState(false);
    const [, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsFailed(false);
    }, [svgString]);

    const handleImageLoad = (): void => {
        setIsLoaded(true);
        onLoad && onLoad();
    };

    const handleImageError = (): void => {
        setIsFailed(true);
        onError && onError();
    };

    return (
        <>
            {!isFailed && (
                <div className={className}>
                    <img
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        src={`data:image/svg+xml;utf8,${svgString}`}
                    />
                </div>
            )}
        </>
    );
};
