/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/typedef */
import * as React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...rest }): JSX.Element | null => {
    const ImportedIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = React.useState(false);

    // React.useEffect(() => {
    //     setLoading(true);
    //     const importIcon = async (): Promise<void> => {
    //         try {
    //             ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./${name}.svg`)).default;
    //         } catch (err) {
    //             // Your own error handling logic, throwing error for the sake of
    //             // simplicity
    //             // throw err;
    //             console.log(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     importIcon();
    //     // Prevent "React state update on an unmounted component" error.
    //     return (): void => {
    //         // eslint-disable-next-line no-undefined
    //         ImportedIconRef.current = undefined;
    //     };
    // }, [name]);

    // if (!loading && ImportedIconRef.current) {
    //     const { current: ImportedIcon } = ImportedIconRef;
    //     return <ImportedIcon {...rest} />;
    // }

    // return null;
    return (
        <svg
            id="Capa_1"
            enableBackground="new 0 0 556.235 556.235"
            viewBox="0 0 556.235 556.235"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
        >
            <path d="m467.833 155.868c3.768 31.542.713 65.64-15.857 70.102 0 0-12.85-58.808-48.877-101.326-14.17-4.899-28.955-9.071-44.443-12.252 9.323 35.255 10.389 90.434-11.01 96.195 0 0-13.164-60.993-50.674-103.647-6.257-.282-12.479-.647-18.855-.647-14.609 0-28.796.987-42.739 2.44 10.766 34.644 13.217 95.773-9.372 101.854 0 0-11.411-51.438-42.363-92.912-19.515 4.808-37.96 11.032-55.099 18.583 12.81 32.484 17.442 102.558-6.832 109.094 0 0-9.763-45.516-36.577-85.405-52.639 35.315-85.135 85.236-85.135 141.559 0 69.546 48.243 152.435 278.117 152.435s278.117-82.889 278.117-152.435c.001-57.458-33.868-108.22-88.401-143.638z"></path>
        </svg>
    );
};
