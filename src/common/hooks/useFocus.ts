import { Input } from 'antd';
import { RefObject, useCallback, useRef } from 'react';

export const useFocus = (): [RefObject<Input>, () => void] => {
    const htmlElementRef = useRef<Input>(null);
    const setFocus = useCallback(() => {
        if (!!htmlElementRef.current) {
            htmlElementRef.current.focus();
        }
    }, [htmlElementRef]);

    return [htmlElementRef, setFocus];
};
