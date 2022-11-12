import chalk from 'chalk';

export function fatal(msg: string) {
	console.error(`[!] ${chalk.bgRed.whiteBright.bold(msg)}`);
}

export function error(msg: string) {
	console.error(`[E] ${chalk.red(msg)}`);
}

export function warn(msg: string) {
	console.warn(`[-] ${chalk.yellow(msg)}`);
}

export function debug(msg: string) {
	console.log(`[?] ${chalk.cyanBright(msg)}`);
}

export function info(msg: string) {
	console.info(`[i] ${chalk.white(msg)}`);
}

export function log(msg: string) {
	console.log(`[#] ${msg}`);
}
