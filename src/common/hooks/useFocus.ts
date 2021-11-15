import { Input } from 'antd';
import { RefObject, useCallback, useRef } from 'react';

export const useFocus = <T extends Input>(): [RefObject<T>, () => void] => {
    const htmlElementRef = useRef<T>(null);
    const setFocus = useCallback(() => {
        if (htmlElementRef.current) {
            htmlElementRef.current.focus();
        }
    }, [htmlElementRef]);

    return [htmlElementRef, setFocus];
};
