import chalk, { Chalk } from 'chalk';
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import { useMemo } from 'react';

const colors = new chalk.Instance({ level: 3 });

const levelColors: { [key: string]: Chalk } = {
    TRACE: colors.magenta,
    DEBUG: colors.cyan,
    INFO: colors.blueBright,
    WARN: colors.yellow,
    ERROR: colors.red
};

prefix.reg(log);
log.enableAll();

prefix.apply(log, {
    format: (level: string, name: string | undefined, timestamp: Date) =>
        `${chalk.gray(`[${timestamp}]`)} ${levelColors[level.toUpperCase()](level)} ${colors.green.bold(`${name}:`)}`
});

prefix.apply(log.getLogger('critical'), {
    format: (level: string, name: string | undefined, timestamp: Date) =>
        colors.red.bold(`[${timestamp}] ${level} ${name}:`)
});

log.info('Setup application logger');

export const useLogger = (name: string): log.Logger => {
    const logger = useMemo(() => log.getLogger(name), [name]);
    return logger;
};
