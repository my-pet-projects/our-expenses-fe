import { useState } from 'react';

type SvgIconProps = {
    svgString: string;
    className?: string;
};

export const SvgIcon = ({ svgString, className }: SvgIconProps): JSX.Element => {
    const [isFailed, setIsFailed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = (): void => {
        setIsLoaded(true);
    };

    const handleImageError = (): void => {
        setIsFailed(true);
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
